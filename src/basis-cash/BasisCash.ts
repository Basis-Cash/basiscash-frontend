import { Fetcher, Route, Token } from '@sushiswap/sdk';
import { Configuration } from './config';
import { ContractName, ShareMetric, SushiSwapPoolMISRemain, TokenStat, TreasuryAllocationTime } from './types';
import { BigNumber, Contract, ethers, Overrides } from 'ethers';
import { decimalToBalance } from './ether-utils';
import { TransactionResponse } from '@ethersproject/providers';
import ERC20 from './ERC20';
import { getDisplayBalance } from '../utils/formatBalance';
import { getDefaultProvider } from '../utils/provider';
import IUniswapV2PairABI from './IUniswapV2Pair.abi.json';
import { parseUnits } from 'ethers/lib/utils';

/**
 * An API module of Basis Cash contracts.
 * All contract-interacting domain logic should be defined in here.
 */
export class BasisCash {
  myAccount: string;
  provider: ethers.providers.Web3Provider;
  signer?: ethers.Signer;
  config: Configuration;
  contracts: { [name: string]: Contract };
  externalTokens: { [name: string]: ERC20 };
  boardroomVersionOfUser?: string;

  bacDai: Contract;
  basDai: Contract;
  BAC: ERC20;
  BAS: ERC20;
  BAB: ERC20;
  USDT: ERC20;

  constructor(cfg: Configuration) {
    const { deployments, externalTokens } = cfg;
    const provider = getDefaultProvider();

    // loads contracts from deployments
    this.contracts = {};
    for (const [name, deployment] of Object.entries(deployments)) {
      this.contracts[name] = new Contract(deployment.address, deployment.abi, provider);
    }
    this.externalTokens = {};
    for (const [symbol, [address, decimal]] of Object.entries(externalTokens)) {
      this.externalTokens[symbol] = new ERC20(address, provider, symbol, decimal); // TODO: add decimal
    }
    this.BAC = new ERC20(deployments.Cash.address, provider, 'MIC');
    this.BAS = new ERC20(deployments.Share.address, provider, 'MIS');
    this.BAB = new ERC20(deployments.Bond.address, provider, 'MIB');
    this.USDT = new ERC20(externalTokens['USDT'][0], provider, 'USDT');

    // SushiSwap Pair
    this.bacDai = new Contract(
      externalTokens['MIC_USDT-SUSHI-LPv2'][0],
      IUniswapV2PairABI,
      provider,
    );
    this.basDai = new Contract(
      externalTokens['MIS_USDT-SUSHI-LPv2'][0],
      IUniswapV2PairABI,
      provider,
    )

    this.config = cfg;
    this.provider = provider;
  }

  /**
   * @param provider From an unlocked wallet. (e.g. Metamask)
   * @param account An address of unlocked wallet account.
   */
  unlockWallet(provider: any, account: string) {
    const newProvider = new ethers.providers.Web3Provider(provider, this.config.chainId);

    this.signer = newProvider.getSigner(0);
    this.myAccount = account;
    for (const [name, contract] of Object.entries(this.contracts)) {
      this.contracts[name] = contract.connect(this.signer);
    }
    const tokens = [this.BAC, this.BAS, this.BAB, ...Object.values(this.externalTokens)];
    for (const token of tokens) {
      token.connect(this.signer);
    }
    this.bacDai = this.bacDai.connect(this.signer);
    console.log(`🔓 Wallet is unlocked. Welcome, ${account}!`);
    this.fetchBoardroomVersionOfUser()
      .then((version) => (this.boardroomVersionOfUser = version))
      .catch((err) => {
        console.error(`Failed to fetch boardroom version: ${err.stack}`);
        this.boardroomVersionOfUser = 'latest';
      });
  }

  get isUnlocked(): boolean {
    return !!this.myAccount;
  }

  gasOptions(gas: BigNumber): Overrides {
    const multiplied = Math.floor(gas.toNumber() * this.config.gasLimitMultiplier);
    console.log(`⛽️ Gas multiplied: ${gas} -> ${multiplied}`);
    return {
      gasLimit: BigNumber.from(multiplied),
    };
  }

  /**
   * @returns Basis Cash (BAC) stats from SushiSwap.
   * It may differ from the BAC price used on Treasury (which is calculated in TWAP)
   */
  async getCashStatFromSushiSwap(): Promise<TokenStat> {
    const supply = await this.BAC.displayedTotalSupply();
    return {
      priceInUSDT: await this.getTokenPriceFromSushiSwap(this.BAC),
      totalSupply: supply,
    };
  }

  /**
   * @returns Estimated Basis Cash (BAC) price data,
   * calculated by 1-day Time-Weight Averaged Price (TWAP).
   */
  async getCashStatInEstimatedTWAP(): Promise<TokenStat> {
    const { Oracle } = this.contracts;

    // estimate current TWAP price
    const cumulativePrice: BigNumber = await this.bacDai.price0CumulativeLast();
    const cumulativePriceLast = await Oracle.price0CumulativeLast();
    const elapsedSec = Math.floor(Date.now() / 1000 - (await Oracle.blockTimestampLast()));

    const denominator112 = BigNumber.from(2).pow(112);
    const denominator1e18 = BigNumber.from(10).pow(18);
    const cashPriceTWAP = cumulativePrice
      .sub(cumulativePriceLast)
      .mul(denominator1e18)
      .div(elapsedSec)
      .div(denominator112);

    const totalSupply = await this.BAC.displayedTotalSupply();
    return {
      priceInUSDT: getDisplayBalance(cashPriceTWAP, 6),
      totalSupply,
    };
  }

  async getCashPriceInLastTWAP(): Promise<BigNumber> {
    const { Treasury } = this.contracts;
    return Treasury.getSeigniorageOraclePrice();
  }

  async getBondOraclePriceInLastTWAP(): Promise<BigNumber> {
    const { Treasury } = this.contracts;
    return Treasury.getBondOraclePrice();
  }

  async getBondStat(): Promise<TokenStat> {
    const decimals = BigNumber.from(10).pow(18);

    const cashPrice: BigNumber = await this.getBondOraclePriceInLastTWAP();
    const bondPrice = cashPrice.pow(2).div(decimals);

    return {
      priceInUSDT: getDisplayBalance(bondPrice),
      totalSupply: await this.BAB.displayedTotalSupply(),
    };
  }

  async getShareMetric(): Promise<ShareMetric> {
    const totalSupply = await this.BAS.totalSupply();

    const { USDTMICLPTokenSharePool, USDTMISLPTokenSharePool } = this.contracts;
    const [
      USDTMICStakePoolRemain,
      USDTMISStakePoolRemain
    ] = await Promise.all([
      this.BAS.balanceOf(USDTMICLPTokenSharePool.address),
      this.BAS.balanceOf(USDTMISLPTokenSharePool.address),
    ])

    const circulatingSupply = BigNumber.from(totalSupply)
      .sub(USDTMICStakePoolRemain)
      .sub(USDTMISStakePoolRemain);

    const boardroomBalance = await this.BAS.balanceOf(this.contracts.Boardroom1.address);
    const USDTMISPoolBalance = await this.BAS.balanceOf(this.basDai.address);
    const unstakedBalance = circulatingSupply.sub(boardroomBalance).sub(USDTMISPoolBalance);

    return {
      USDTMICStakePoolRemain: getDisplayBalance(USDTMICStakePoolRemain, 18, 0),
      USDTMISStakePoolRemain: getDisplayBalance(USDTMISStakePoolRemain, 18, 0),
      circulatingSupply: getDisplayBalance(circulatingSupply, 18, 0),
      USDTMISPoolBalance: getDisplayBalance(USDTMISPoolBalance, 18, 0),
      boardroomBalance: getDisplayBalance(boardroomBalance, 18, 0),
      unstakedBalance: getDisplayBalance(unstakedBalance, 18, 0),
    }
  }

  async getSushiSwapStakePoolMISRemain(): Promise<SushiSwapPoolMISRemain> {
    const { USDTMICLPTokenSharePool, USDTMISLPTokenSharePool } = this.contracts;
    const [
      USDTMICPoolBalance,
      USDTMISPoolBalance,
    ] = await Promise.all([
      this.BAS.balanceOf(USDTMICLPTokenSharePool.address),
      this.BAS.balanceOf(USDTMISLPTokenSharePool.address),
    ]);
    return {
      USDTMICStakePoolRemain: getDisplayBalance(USDTMICPoolBalance, 18, 0),
      USDTMISStakePoolRemain: getDisplayBalance(USDTMISPoolBalance, 18, 0),
    }
  }

  async getShareStat(): Promise<TokenStat> {
    return {
      priceInUSDT: await this.getTokenPriceFromSushiSwap(this.BAS),
      totalSupply: await this.BAS.displayedTotalSupply(),
    };
  }

  async getTokenPriceFromSushiSwap(tokenContract: ERC20): Promise<string> {
    await this.provider.ready;

    const { chainId } = this.config;
    const { USDT } = this.config.externalTokens;

    const usdt = new Token(chainId, USDT[0], USDT[1]);
    const token = new Token(chainId, tokenContract.address, 18);

    try {
      const usdtToToken = await Fetcher.fetchPairData(usdt, token, this.provider);
      const priceInUSDT = new Route([usdtToToken], token);
      return priceInUSDT.midPrice.toSignificant(3);
    } catch (err) {
      console.error(`Failed to fetch token price of ${tokenContract.symbol}: ${err}`);
    }
  }

  /**
   * Buy bonds with cash.
   * @param amount amount of cash to purchase bonds with.
   */
  async buyBonds(amount: string | number): Promise<TransactionResponse> {
    const { Treasury } = this.contracts;
    return await Treasury.buyBonds(decimalToBalance(amount), await this.getBondOraclePriceInLastTWAP());
  }

  /**
   * Redeem bonds for cash.
   * @param amount amount of bonds to redeem.
   */
  async redeemBonds(amount: string): Promise<TransactionResponse> {
    const { Treasury } = this.contracts;
    return await Treasury.redeemBonds(decimalToBalance(amount), await this.getBondOraclePriceInLastTWAP());
  }

  async earnedFromBank(poolName: ContractName, account = this.myAccount): Promise<BigNumber> {
    const pool = this.contracts[poolName];
    try {
      return await pool.earned(account);
    } catch (err) {
      console.error(`Failed to call earned() on pool ${pool.address}: ${err.stack}`);
      return BigNumber.from(0);
    }
  }

  async stakedBalanceOnBank(
    poolName: ContractName,
    account = this.myAccount,
  ): Promise<BigNumber> {
    const pool = this.contracts[poolName];
    try {
      return await pool.balanceOf(account);
    } catch (err) {
      console.error(`Failed to call balanceOf() on pool ${pool.address}: ${err.stack}`);
      return BigNumber.from(0);
    }
  }

  async depositedBalanceOnVault(
    vaultName: ContractName,
    account = this.myAccount,
  ): Promise<BigNumber> {
    const vault = this.contracts[vaultName];
    try {
      return await vault.balanceOf(account);
    } catch (err) {
      console.error(`Failed to call balanceOf() on vault ${vault.address}: ${err.stack}`);
      return BigNumber.from(0);
    }
  }

  async totalBalanceOfVault(
    vaultName: ContractName
  ): Promise<BigNumber> {
    const vault = this.contracts[vaultName];
    try {
      return await vault.balance();
    } catch (err) {
      console.error(`Failed to call balance() on vault ${vault.address}: ${err.stack}`);
      return BigNumber.from(0);
    }
  }

  /**
   * Deposits token to given pool.
   * @param poolName A name of pool contract.
   * @param amount Number of tokens with decimals applied. (e.g. 1.45 DAI * 10^18)
   * @returns {string} Transaction hash
   */
  async stake(poolName: ContractName, amount: BigNumber): Promise<TransactionResponse> {
    const pool = this.contracts[poolName];
    const gas = await pool.estimateGas.stake(amount);
    return await pool.stake(amount, this.gasOptions(gas));
  }

  /**
   * Deposits token to given vault.
   * @param vaultName A name of pool contract.
   * @param amount Number of tokens with decimals applied. (e.g. 1.45 DAI * 10^18)
   * @returns {string} Transaction hash
   */
  async deposit(vaultName: ContractName, amount: BigNumber): Promise<TransactionResponse> {
    const vault = this.contracts[vaultName];
    const gas = await vault.estimateGas.deposit(amount);
    return await vault.deposit(amount, this.gasOptions(gas));
  }

  /**
   * Get reward rate of a given pool.
   * @param poolName A name of pool contract.
   * @returns {BigNumber} reward rate
   */
  async rewardRate(poolName: ContractName): Promise<BigNumber> {
    const pool = this.contracts[poolName];

    try {
      return await pool.rewardRate();
    } catch (err) {
      console.error(`Failed to call rewardRate() on vault ${pool.address}: ${err.stack}`);
      return BigNumber.from(0);
    }
  }

  /**
   * Get total supply of a given pool.
   * @param poolName A name of pool contract.
   * @returns {BigNumber} total supply
   */
  async totalSupply(poolName: ContractName): Promise<BigNumber> {
    const pool = this.contracts[poolName];

    try {
      return await pool.totalSupply();
    } catch (err) {
      console.error(`Failed to call totalSupply() on contract ${pool.address}: ${err.stack}`);
      return BigNumber.from(0);
    }
  }

  /**
   * Withdraws token from given pool.
   * @param poolName A name of pool contract.
   * @param amount Number of tokens with decimals applied. (e.g. 1.45 DAI * 10^18)
   * @returns {string} Transaction hash
   */
  async unstake(poolName: ContractName, amount: BigNumber): Promise<TransactionResponse> {
    const pool = this.contracts[poolName];
    const gas = await pool.estimateGas.withdraw(amount);
    return await pool.withdraw(amount, this.gasOptions(gas));
  }

  /**
   * Transfers earned token reward from given pool to my account.
   */
  async harvest(poolName: ContractName): Promise<TransactionResponse> {
    const pool = this.contracts[poolName];
    const gas = await pool.estimateGas.getReward();
    return await pool.getReward(this.gasOptions(gas));
  }

  /**
   * Harvests and withdraws deposited tokens from the pool.
   */
  async exit(poolName: ContractName): Promise<TransactionResponse> {
    const pool = this.contracts[poolName];
    const gas = await pool.estimateGas.exit();
    return await pool.exit(this.gasOptions(gas));
  }

  async fetchBoardroomVersionOfUser(): Promise<string> {
    return 'latest';
  }

  boardroomByVersion(version: string): Contract {
    return this.contracts.Boardroom1;
  }

  currentBoardroom(): Contract {
    if (!this.boardroomVersionOfUser) {
      throw new Error('you must unlock the wallet to continue.');
    }
    return this.boardroomByVersion(this.boardroomVersionOfUser);
  }

  isOldBoardroomMember(): boolean {
    return this.boardroomVersionOfUser !== 'latest';
  }

  async stakeShareToBoardroom(amount: string): Promise<TransactionResponse> {
    if (this.isOldBoardroomMember()) {
      throw new Error("you're using old Boardroom. please withdraw and deposit the BAS again.");
    }
    const Boardroom = this.currentBoardroom();
    return await Boardroom.stake(decimalToBalance(amount));
  }

  async getStakedSharesOnBoardroom(): Promise<BigNumber> {
    const Boardroom = this.currentBoardroom();
    if (this.boardroomVersionOfUser === 'v1') {
      return await Boardroom.getShareOf(this.myAccount);
    }
    return await Boardroom.balanceOf(this.myAccount);
  }

  async getEarningsOnBoardroom(): Promise<BigNumber> {
    const Boardroom = this.currentBoardroom();
    if (this.boardroomVersionOfUser === 'v1') {
      return await Boardroom.getCashEarningsOf(this.myAccount);
    }
    return await Boardroom.earned(this.myAccount);
  }

  async withdrawShareFromBoardroom(amount: string): Promise<TransactionResponse> {
    const Boardroom = this.currentBoardroom();
    return await Boardroom.withdraw(decimalToBalance(amount));
  }

  async harvestCashFromBoardroom(): Promise<TransactionResponse> {
    const Boardroom = this.currentBoardroom();
    if (this.boardroomVersionOfUser === 'v1') {
      return await Boardroom.claimDividends();
    }
    return await Boardroom.claimReward();
  }

  async exitFromBoardroom(): Promise<TransactionResponse> {
    const Boardroom = this.currentBoardroom();
    return await Boardroom.exit();
  }

  async getTreasuryNextAllocationTime(): Promise<TreasuryAllocationTime> {
    const { Treasury } = this.contracts;
    const nextEpochTimestamp: BigNumber = await Treasury.nextEpochPoint();
    const period: BigNumber = await Treasury.getPeriod();

    const nextAllocation = new Date(nextEpochTimestamp.mul(1000).toNumber());
    const prevAllocation = new Date(nextAllocation.getTime() - period.toNumber() * 1000);
    return { prevAllocation, nextAllocation };
  }
}
