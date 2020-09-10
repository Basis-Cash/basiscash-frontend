import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { Fetcher, Route, Token, WETH } from '@uniswap/sdk';
import { Configuration, defaultEthereumConfig } from './config';
import { TokenStat } from './types';

/**
 * An API module of Basis Cash contracts.
 * All contract-interacting domain logic should be defined in here.
 */
export class BasisCash {
  web3: Web3;
  config: Configuration;
  contracts: { [name: string]: Contract };

  constructor(cfg: Configuration) {
    const { endpoint, deployments } = cfg;
    const ethConfig = Object.assign(defaultEthereumConfig, cfg.config || {});

    const providerKind = endpoint.includes('wss')
      ? Web3.providers.WebsocketProvider
      : Web3.providers.HttpProvider;

    this.web3 = new Web3(
      new providerKind(endpoint, {
        timeout: ethConfig.ethereumNodeTimeout,
      }),
    );

    // loads contracts from deployments
    this.contracts = {};
    for (const [name, deployment] of Object.entries(deployments)) {
      this.contracts[name] = new this.web3.eth.Contract(deployment.abi, deployment.address);
    }
    this.config = cfg;
  }

  /** @param provider from an unlocked wallet. (e.g. Metamask) */
  injectProvider(provider: any) {
    this.web3.setProvider(provider);
    console.log('🔓 Wallet is unlocked');
  }

  /** @returns a list of Pool contracts (e.g. BACDAIPool, BACYFIPool) */
  bankContracts(): Contract[] {
    return Object.keys(this.contracts)
      .filter((name) => name.endsWith('Pool'))
      .map((name) => this.contracts[name]);
  }

  async getTokenStat(contract: Contract): Promise<TokenStat> {
    console.log('Retrieving token stats');
    const { chainId, daiAddress, isMockedPrice } = this.config.uniswapConfig;

    const dai = new Token(chainId, daiAddress, 18);
    const token = isMockedPrice
      ? WETH[chainId] // display WETH price on development
      : new Token(chainId, contract.options.address, 18);

    const priceInDAI = new Route([await Fetcher.fetchPairData(dai, token)], token);
    return {
      priceInDAI: priceInDAI.midPrice.toSignificant(6),
      totalSupply: await this.getTokenSupply(contract),
    };
  }

  private async getTokenSupply(contract: Contract): Promise<string> {
    try {
      return balanceOf(await contract.methods.totalSupply().call());
    } catch (err) {
      console.error(err);
      return 'Unknown';
    }
  }
}

function balanceOf(n: number): string {
  return `${Math.ceil(n / 1e18)}`;
}
