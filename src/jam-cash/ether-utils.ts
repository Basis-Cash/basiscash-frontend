import Web3 from 'web3';
import { defaultEthereumConfig, EthereumConfig } from './config';
import { formatUnits, parseUnits } from 'ethers/lib/utils';
import { BigNumber } from 'ethers';

export function web3ProviderFrom(endpoint: string, config?: EthereumConfig): any {
  const ethConfig = Object.assign(defaultEthereumConfig, config || {});

  const providerClass = endpoint.includes('wss')
    ? Web3.providers.WebsocketProvider
    : Web3.providers.HttpProvider;

  return new providerClass(endpoint, {
    timeout: ethConfig.ethereumNodeTimeout,
  });
}

export function balanceToDecimal(s: string): string {
  return formatUnits(s);
}

export function decimalToBalance(d: string | number, decimals = 18): BigNumber {
  return parseUnits(String(d), decimals);
}
