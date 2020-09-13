import Web3 from 'web3';
import { defaultEthereumConfig, EthereumConfig } from './config';

export function web3ProviderFrom(endpoint: string, config?: EthereumConfig): any {
  const ethConfig = Object.assign(defaultEthereumConfig, config || {});

  const providerClass = endpoint.includes('wss')
    ? Web3.providers.WebsocketProvider
    : Web3.providers.HttpProvider

  return new providerClass(endpoint, {
    timeout: ethConfig.ethereumNodeTimeout,
  });
}

export function balanceOf(n: number): string {
  return `${Math.ceil(n / 1e18)}`;
}
