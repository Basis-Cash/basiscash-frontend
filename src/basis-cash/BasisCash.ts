import { Fetcher, Route, Token } from '@uniswap/sdk';
import { Configuration } from './config';
import { TokenStat } from './types';
import { ethers, Contract, BigNumber } from 'ethers';
import { decimalToBalance, balanceToDecimal, web3ProviderFrom } from './ether-utils';
import { TransactionResponse } from '@ethersproject/providers';
import ERC20 from './ERC20';

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
    const { defaultProvider, deployments, externalTokens } = cfg;
    const provider = new ethers.providers.Web3Provider(web3ProviderFrom(defaultProvider));

    // loads contracts from deployments
    this.contracts = {};
    for (const [name, deployment] of Object.entries(deployments)) {
      this.contracts[name] = new Contract(deployment.address, deployment.abi, provider);
    }
    this.externalTokens = {};
    for (const [symbol, address] of Object.entries(externalTokens)) {
      this.externalTokens[symbol] = new ERC20(address, provider, symbol); // TODO: add decimal
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
    this.provider = new ethers.providers.Web3Provider(provider);
    this.signer = this.provider.getSigner(0);
    this.myAccount = account;
    for (const [name, contract] of Object.entries(this.contracts)) {
      this.contracts[name] = contract.connect(this.signer);
    }
    for (const [name, contract] of Object.entries(this.externalTokens)) {
      this.externalTokens[name] = contract.connect(this.signer);
    }
    this.BAC = this.BAC.connect(this.signer);
    this.BAS = this.BAS.connect(this.signer);
    this.BAB = this.BAB.connect(this.signer);
    console.log(`🔓 Wallet is unlocked. Welcome, ${account}!`);
  }

  get isUnlocked(): boolean {
    return !!this.myAccount;
  }

  /** @returns an object of Pool contracts (e.g. BACDAIPool, BACYFIPool) */
  bankContracts(): { [name: string]: Contract } {
    return Object.keys(this.contracts)
      .filter((name) => name.endsWith('Pool'))
      .reduce((prev, name) => ({ ...prev, [name]: this.contracts[name] }), {});
  }

  async getCashStat(): Promise<TokenStat> {
    const { Cash } = this.contracts;
    return {
      priceInDAI: await this.getTokenPrice(Cash),
      totalSupply: await this.getTokenSupply(Cash),
    };
  }

  async getBondStat(): Promise<TokenStat> {
    const { Cash, Bond } = this.contracts;
    const cashPrice = Number(await this.getTokenPrice(Cash));
    return {
      priceInDAI: (cashPrice ** 2).toPrecision(3),
      totalSupply: await this.getTokenSupply(Bond),
    };
  }

  async getShareStat(): Promise<TokenStat> {
    const { Share } = this.contracts;
    return {
      priceInDAI: await this.getTokenPrice(Share),
      totalSupply: await this.getTokenSupply(Share),
    };
  }

  async getTokenPrice(contract: Contract): Promise<string> {
    const { chainId } = this.config;
    const { DAI } = this.config.externalTokens;

    const dai = new Token(chainId, DAI, 18);
    const token = new Token(chainId, contract.address, 18);

    try {
      const daiToToken = await Fetcher.fetchPairData(dai, token, this.provider);
      const priceInDAI = new Route([daiToToken], token);
      return priceInDAI.midPrice.toSignificant(3);
    } catch (err) {
      console.error(`Failed to fetch token price of ${contract.address}: ${err}`);
    }
  }

  private async getTokenSupply(contract: Contract): Promise<string> {
    try {
      return balanceToDecimal(await contract.totalSupply());
    } catch (err) {
      console.error(`Failed to fetch token supply: ${err.stack}`);
      return 'Unknown';
    }
  }

  /**
   * Buy bonds from the system.
   * @param amount amount of cash to purchase bonds with.
   */
  async buyBonds(amount: string | number): Promise<TransactionResponse> {
    const { Treasury } = this.contracts;
    return await Treasury.buyBonds(decimalToBalance(amount));
  }

  async earnedFromBank(pool: Contract, account = this.myAccount): Promise<BigNumber> {
    try {
      return await pool.earned(account);
    } catch (err) {
      console.error(`Failed to call earned() on pool ${pool.address}: ${err.stack}`);
      return BigNumber.from(0);
    }
  }

  async stakedBalanceOnBank(pool: Contract, account = this.myAccount): Promise<BigNumber> {
    try {
      return await pool.balanceOf(account);
    } catch (err) {
      console.error(`Failed to call balanceOf() on pool ${pool.address}: ${err.stack}`);
      return BigNumber.from(0);
    }
  }

  /**
   * Deposits token to given pool.
   * @param pool An instance of pool {@code Contract}.
   * @param amount Number of tokens. (e.g. 1.45 DAI -> '1.45')
   * @returns {string} Transaction hash
   */
  async stake(pool: Contract, amount: string | number): Promise<TransactionResponse> {
    return await pool.stake(decimalToBalance(amount));
  }

  /**
   * Withdraws token from given pool.
   * @param pool An instance of pool {@code Contract}.
   * @param amount Number of tokens. (e.g. 1.45 DAI -> '1.45')
   * @returns {string} Transaction hash
   */
  async unstake(pool: Contract, amount: string | number): Promise<TransactionResponse> {
    return await pool.withdraw(decimalToBalance(amount));
  }

  async stakeShareToBoardroom(amount: BigNumber): Promise<TransactionResponse> {
    const { Boardroom } = this.contracts;
    return await Boardroom.stake(amount);
  }

  async getStakedSharesOnBoardroom(): Promise<BigNumber> {
    const { Boardroom } = this.contracts;
    return await Boardroom.getBoardSeatBalance();
  }

  async withdrawShareFromBoardroom(amount: BigNumber): Promise<TransactionResponse> {
    const { Boardroom } = this.contracts;
    return await Boardroom.withdraw(amount);
  }
}
