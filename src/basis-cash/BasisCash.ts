import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { Configuration, defaultEthereumConfig } from "./config";

/**
 * An API module of Basis Cash contracts.
 * All contract-interacting domain logic should be defined in here.
 */
export class BasisCash {
  web3: Web3;
  contracts: {[name: string]: Contract}

  constructor(cfg: Configuration) {
    const { endpoint, deployments } = cfg;
    const ethConfig = Object.assign(defaultEthereumConfig, cfg.config || {});

    const providerKind = endpoint.includes('wss')
      ? Web3.providers.WebsocketProvider
      : Web3.providers.HttpProvider;

    this.web3 = new Web3(new providerKind(endpoint, {
      timeout: ethConfig.ethereumNodeTimeout,
    }));

    // loads contracts from deployments
    this.contracts = {};
    for (const [name, deployment] of Object.entries(deployments)) {
      this.contracts[name] = new this.web3.eth.Contract(deployment.abi, deployment.address);
    }
  }

  /** @param provider from an unlocked wallet. (e.g. Metamask) */
  injectProvider(provider: any) {
    this.web3.setProvider(provider);
    console.log('🔓 Wallet is unlocked');
  }

  /** @returns a list of Pool contracts (e.g. BACDAIPool, BACYFIPool) */
  bankContracts(): Contract[] {
    return Object.keys(this.contracts)
      .filter(name => name.endsWith('Pool'))
      .map(name => this.contracts[name]);
  }
}
