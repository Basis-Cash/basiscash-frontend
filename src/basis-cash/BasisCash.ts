import Web3 from 'web3';
import { Contract, SendOptions } from 'web3-eth-contract';
import { Fetcher, Route, Token } from '@uniswap/sdk';
import { Configuration } from './config';
import { TokenStat } from './types';
import { decimalToString } from '../yam/lib/Helpers';
import { ethers } from 'ethers';
import { balanceOf, web3ProviderFrom } from './ether-utils';
import BigNumber from 'bignumber.js';

/**
 * An API module of Basis Cash contracts.
 * All contract-interacting domain logic should be defined in here.
 */
export class BasisCash {
  web3: Web3;
  myAccount: string;
  uniswapProvider: ethers.providers.BaseProvider;
  config: Configuration;
  contracts: { [name: string]: Contract };

  constructor(cfg: Configuration) {
    const { defaultProvider, deployments, uniswapConfig } = cfg;

    this.web3 = new Web3(web3ProviderFrom(defaultProvider));
    this.uniswapProvider = new ethers.providers.Web3Provider(
      web3ProviderFrom(uniswapConfig.provider),
    );

    // loads contracts from deployments
    this.contracts = {};
    for (const [name, deployment] of Object.entries(deployments)) {
      this.contracts[name] = new this.web3.eth.Contract(deployment.abi, deployment.address);
    }
    this.config = cfg;
  }

  /**
   * @param provider From an unlocked wallet. (e.g. Metamask)
   * @param account An address of unlocked wallet account.
   */
  unlockWallet(provider: any, account: string) {
    this.web3.setProvider(provider);
    this.myAccount = account;
    console.log(`🔓 Wallet is unlocked. Welcome, ${account}!`);
  }

  private async sendTransaction(tx: any, description: string): Promise<string> {
    const options: SendOptions = {
      from: this.myAccount,
    };
    return tx
      .send(options)
      .on('transactionHash', (tx: { transactionHash: string }) => {
      console.log(`${description}: ${tx}`);
      return tx.transactionHash;
    });
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
    const { Bond } = this.contracts;
    const price = Number(await this.getTokenPrice(Bond));
    return {
      priceInDAI: (price ** 2).toPrecision(3),
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
    const { chainId, daiAddress, isMockedPrice } = this.config.uniswapConfig;

    const dai = new Token(chainId, daiAddress, 18);
    const token = isMockedPrice
      ? new Token(chainId, this.config.externalTokens['USDC'], 6) // display USDC price on development
      : new Token(chainId, contract.options.address, 18);

    const daiToToken = await Fetcher.fetchPairData(dai, token, this.uniswapProvider);
    const priceInDAI = new Route([daiToToken], token);
    return priceInDAI.midPrice.toSignificant(3);
  }

  private async getTokenSupply(contract: Contract): Promise<string> {
    try {
      return balanceOf(await contract.methods.totalSupply().call());
    } catch (err) {
      console.error(err);
      return 'Unknown';
    }
  }

  /**
   * Buy bonds from the system.
   * @param amount amount of cash to purchase bonds with.
   */
  async buyBonds(amount: string | number): Promise<void> {
    const { Treasury } = this.contracts;
    const tx = Treasury.methods.buyBonds(decimalToString(amount));
    await this.sendTransaction(tx, `Buy ${amount} BAB`);
  }

  async earnedFromBank(pool: Contract): Promise<BigNumber> {
    try {
      return new BigNumber(await pool.methods.earned(this.myAccount));
    } catch (err) {
      console.error(`Failed to call earned() on pool ${pool.options.address}: ${err.stack}`);
      return new BigNumber(0);
    }
  }

  async stakedBalanceOnBank(pool: Contract): Promise<BigNumber> {
    try {
      return new BigNumber(await pool.methods.balanceOf(this.myAccount));
    } catch (err) {
      console.error(`Failed to call balanceOf() on pool ${pool.options.address}: ${err.stack}`);
      return new BigNumber(0);
    }
  }

  /**
   * Deposits token to given pool.
   * @param pool An instance of pool {@code Contract}.
   * @param amount Number of tokens. (e.g. 1.45 DAI -> '1.45')
   * @param tokenName Name of the token you're staking
   * @returns {string} Transaction hash
   */
  async stake(pool: Contract, amount: string | number, tokenName: string): Promise<string> {
    const tx = pool.methods.stake(decimalToString(amount));
    return await this.sendTransaction(tx, `Stake ${amount} ${tokenName}`);
  }

  /**
   * Withdraws token from given pool.
   * @param pool An instance of pool {@code Contract}.
   * @param amount Number of tokens. (e.g. 1.45 DAI -> '1.45')
   * @param tokenName Name of the token you're staking
   * @returns {string} Transaction hash
   */
  async unstake(pool: Contract, amount: string | number, tokenName: string): Promise<string> {
    const tx = pool.methods.withdraw(decimalToString(amount));
    return await this.sendTransaction(tx, `Withdraw ${amount} ${tokenName}`);
  }
}
