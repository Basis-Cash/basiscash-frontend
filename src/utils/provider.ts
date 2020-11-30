import { ethers } from 'ethers';
import config from '../config';
import { web3ProviderFrom } from '../basis-cash/ether-utils';

export function getDefaultProvider(): ethers.providers.Web3Provider {
  return new ethers.providers.Web3Provider(
    web3ProviderFrom(config.defaultProvider),
    config.chainId,
  )
}
