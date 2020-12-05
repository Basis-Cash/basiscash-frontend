import { Fetcher, Route, Token } from '@uniswap/sdk';
import { Configuration } from './config';
import { ContractName, TokenStat } from './types';
import { BigNumber, Contract, ethers, Overrides } from 'ethers';
import { decimalToBalance } from './ether-utils';
import { TransactionResponse } from '@ethersproject/providers';
import ERC20 from './ERC20';
import { getDisplayBalance } from '../utils/formatBalance';
import { getDefaultProvider } from '../utils/provider';

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

  BAC: ERC20;
  BAS: ERC20;
  BAB: ERC20;

  constructor(cfg: Configuration) {
    const { defaultProvider, deployments, externalTokens, chainId } = cfg;
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
    this.BAC = new ERC20(deployments.Cash.address, provider, 'BAC');
    this.BAS = new ERC20(deployments.Share.address, provider, 'BAS');
    this.BAB = new ERC20(deployments.Bond.address, provider, 'BAB');

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
    console.log(`🔓 Wallet is unlocked. Welcome, ${account}!`);
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
   * @returns Basis Cash (BAC) stats from Uniswap.
   * It may differ from the BAC price used on Treasury (which is calculated in TWAP)
   */
  async getCashStatFromUniswap(): Promise<TokenStat> {
    const supply = await this.BAC.displayedTotalSupply();
    return {
      priceInDAI: await this.getTokenPriceFromUniswap(this.BAC),
      totalSupply: this.config.circSupply,
    };
  }

  /**
   * @returns Basis Cash (BAC) stats from Treasury,
   * calculated by Time-Weight Averaged Price (TWAP).
   */
  async getCashStatFromTreasury(): Promise<TokenStat> {
    const supply = await this.BAC.displayedTotalSupply();
    const { Treasury } = this.contracts;
    const cashPrice: BigNumber = await Treasury.getCashPrice();
    return {
      priceInDAI: getDisplayBalance(cashPrice),
      totalSupply: this.config.circSupply,
    };
  }

  async getBondStat(): Promise<TokenStat> {
    const { Treasury } = this.contracts;
    const decimals = BigNumber.from(10).pow(18);

    const cashPrice: BigNumber = await Treasury.getCashPrice();
    const bondPrice = cashPrice.pow(2).div(decimals);
    return {
      priceInDAI: getDisplayBalance(bondPrice),
      totalSupply: await this.BAB.displayedTotalSupply(),
    };
  }

  async getShareStat(): Promise<TokenStat> {
    return {
      priceInDAI: await this.getTokenPriceFromUniswap(this.BAS),
      totalSupply: await this.BAS.displayedTotalSupply(),
    };
  }

  async getTokenPriceFromUniswap(tokenContract: ERC20): Promise<string> {
    await this.provider.ready;

    const { chainId } = this.config;
    const { DAI } = this.config.externalTokens;

    const dai = new Token(chainId, DAI[0], 18);
    const token = new Token(chainId, tokenContract.address, 18);

    try {
      const daiToToken = await Fetcher.fetchPairData(dai, token, this.provider);
      const priceInDAI = new Route([daiToToken], token);
      return priceInDAI.midPrice.toSignificant(3);
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
    return await Treasury.buyBonds(decimalToBalance(amount));
  }

  /**
   * Redeem bonds for cash.
   * @param amount amount of bonds to redeem.
   */
  async redeemBonds(amount: string): Promise<TransactionResponse> {
    const { Treasury } = this.contracts;
    return await Treasury.redeemBonds(decimalToBalance(amount));
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

  async isOldBoardroomMember(): Promise<boolean> {
    // const { Boardroom1 } = this.contracts;
    // const oldShares = await Boardroom1.getShareOf(this.myAccount);
    // return !!oldShares.gt(0);
    // TODO: uncomment after deploying Boardroom2
    return true;
  }

  async stakeShareToBoardroom(amount: string): Promise<TransactionResponse> {
    if (await this.isOldBoardroomMember()) {
      throw new Error("you're using old Boardroom. please withdraw and deposit the BAS again.")
    }
    const { Boardroom2: Boardroom } = this.contracts;
    return await Boardroom.stake(decimalToBalance(amount));
  }

  async getStakedSharesOnBoardroom(): Promise<BigNumber> {
    const Boardroom = (await this.isOldBoardroomMember())
      ? this.contracts.Boardroom1
      : this.contracts.Boardroom2;
    return await Boardroom.getShareOf(this.myAccount);
  }

  async getEarningsOnBoardroom(): Promise<BigNumber> {
    const Boardroom = (await this.isOldBoardroomMember())
      ? this.contracts.Boardroom1
      : this.contracts.Boardroom2;
    return await Boardroom.getCashEarningsOf(this.myAccount);
  }

  async withdrawShareFromBoardroom(amount: string): Promise<TransactionResponse> {
    const Boardroom = (await this.isOldBoardroomMember())
      ? this.contracts.Boardroom1
      : this.contracts.Boardroom2;
    return await Boardroom.withdraw(decimalToBalance(amount));
  }

  async harvestCashFromBoardroom(): Promise<TransactionResponse> {
    const Boardroom = (await this.isOldBoardroomMember())
      ? this.contracts.Boardroom1
      : this.contracts.Boardroom2;
    return await Boardroom.claimDividends();
  }

  async exitFromBoardroom(): Promise<TransactionResponse> {
    const Boardroom = (await this.isOldBoardroomMember())
      ? this.contracts.Boardroom1
      : this.contracts.Boardroom2;
    return await Boardroom.exit();
  }
}
