import Web3 from 'web3';
import { defaultEthereumConfig, EthereumConfig } from './config';
import BigNumber from 'bignumber.js';
import { INTEGERS } from './constants';

export function web3ProviderFrom(endpoint: string, config?: EthereumConfig): any {
  const ethConfig = Object.assign(defaultEthereumConfig, config || {});

  const providerClass = endpoint.includes('wss')
    ? Web3.providers.WebsocketProvider
    : Web3.providers.HttpProvider;

  return new providerClass(endpoint, {
    timeout: ethConfig.ethereumNodeTimeout,
  });
}

export function balanceOf(n: number): string {
  return `${Math.ceil(n / 1e18)}`;
}

export function stringToDecimal(s: string): BigNumber {
  return new BigNumber(s).div(INTEGERS.INTEREST_RATE_BASE);
}

export function decimalToString(d: string | number): string {
  return new BigNumber(d).times(INTEGERS.INTEREST_RATE_BASE).toFixed(0);
}

export function toString(input: BigNumber): string {
  return new BigNumber(input).toFixed(0);
}
