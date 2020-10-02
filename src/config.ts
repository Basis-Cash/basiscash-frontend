import { ChainId } from '@uniswap/sdk';
import { Configuration } from './basis-cash/config';
import { BankInfo } from './basis-cash';

const configurations: {[env: string]: Configuration} = {
  development: {
    chainId: ChainId.ROPSTEN,
    etherscanUrl: 'https://ropsten.etherscan.io',
    defaultProvider: 'wss://ropsten.infura.io/ws/v3/d3bcb3c54e8c49a7bd1a9b6773e65bbe',
    deployments: require('./basis-cash/deployments/deployments.ropsten.json'),
    externalTokens: {
      DAI: ['0xc2118d4d90b274016cb7a54c03ef52e6c537d957', 18],
      YFI: ['0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e', 18],
      SUSD: ['0x57Ab1E02fEE23774580C119740129eAC7081e9D3', 18],
      USDC: ['0x0d9c8723b343a8368bebe0b5e89273ff8d712e3c', 6],
      USDT: ['0x516de3a7a567d81737e3a46ec4ff9cfd1fcb0136', 6],
      // TODO: replace with real address
      'BAC_DAI-UNI-LPv2': ['0xdc05b286a75ecbb545a6d3cd2a1c864c76dcbe6a', 18],
      'BAS_DAI-UNI-LPv2': ['0x76332e3ec7588fbbbd1734c9c8b9a0199a468c67', 18],
    },
  },
  production: {
    /*chainId: ChainId.MAINNET,
    etherscanUrl: 'https://etherscan.io',
    defaultProvider: 'wss://mainnet.infura.io/ws/v3/d3bcb3c54e8c49a7bd1a9b6773e65bbe',
    deployments: require('./basis-cash/deployments/deployments.local.json'),
    externalTokens: {
      DAI: ['0x6B175474E89094C44Da98b954EedeAC495271d0F', 18],
      YFI: ['0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e', 18],
      SUSD: ['0x57Ab1E02fEE23774580C119740129eAC7081e9D3', 18],
      USDC: ['0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6],
      USDT: ['0xdAC17F958D2ee523a2206206994597C13D831ec7', 6],
      // TODO: replace with real address
      'BAC_DAI-UNI-LPv2': ['0x6B175474E89094C44Da98b954EedeAC495271d0F', 18],
      'BAS_DAI-UNI-LPv2': ['0x6B175474E89094C44Da98b954EedeAC495271d0F', 18], */
      chainId: ChainId.ROPSTEN,
      etherscanUrl: 'https://ropsten.etherscan.io',
      defaultProvider: 'wss://ropsten.infura.io/ws/v3/d3bcb3c54e8c49a7bd1a9b6773e65bbe',
      deployments: require('./basis-cash/deployments/deployments.ropsten.json'),
      externalTokens: {
      DAI: ['0xc2118d4d90b274016cb7a54c03ef52e6c537d957', 18],
      YFI: ['0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e', 18],
      SUSD: ['0x57Ab1E02fEE23774580C119740129eAC7081e9D3', 18],
      USDC: ['0x0d9c8723b343a8368bebe0b5e89273ff8d712e3c', 6],
      USDT: ['0x516de3a7a567d81737e3a46ec4ff9cfd1fcb0136', 6],
      // TODO: replace with real address
      'BAC_DAI-UNI-LPv2': ['0xdc05b286a75ecbb545a6d3cd2a1c864c76dcbe6a', 18],
      'BAS_DAI-UNI-LPv2': ['0x76332e3ec7588fbbbd1734c9c8b9a0199a468c67', 18],
    },
  },
}

export const bankDefinitions: {[contractName: string]: BankInfo} = {
  BACDAIPool: {
    name: 'Earn BAC by DAI',
    contract: 'BACDAIPool',
    depositTokenName: 'DAI',
    earnTokenName: 'BAC',
    sort: 1,
  },
  BACUSDCPool: {
    name: 'Earn BAC by USDC',
    contract: 'BACUSDCPool',
    depositTokenName: 'USDC',
    earnTokenName: 'BAC',
    sort: 2,
  },
  BACSUSDPool: {
    name: 'Earn BAC by sUSD',
    contract: 'BACSUSDPool',
    depositTokenName: 'SUSD',
    earnTokenName: 'BAC',
    sort: 3,
  },
  BACUSDTPool: {
    name: 'Earn BAC by USDT',
    contract: 'BACUSDTPool',
    depositTokenName: 'USDT',
    earnTokenName: 'BAC',
    sort: 4,
  },
  BACyCRVPool: {
    name: 'Earn BAC by yCRV',
    contract: 'BACyCRVPool',
    depositTokenName: 'yCRV',
    earnTokenName: 'BAC',
    sort: 5,
  },
  DAIBACLPTokenSharePool: {
    name: 'Earn BAS by BAC-DAI-LP',
    contract: 'DAIBACLPTokenSharePool',
    depositTokenName: 'BAC_DAI-UNI-LPv2',
    earnTokenName: 'BAS',
    sort: 6,
  },
  DAIBASLPTokenSharePool: {
    name: 'Earn BAS by BAS-DAI-LP',
    contract: 'DAIBASLPTokenSharePool',
    depositTokenName: 'BAS_DAI-UNI-LPv2',
    earnTokenName: 'BAS',
    sort: 7,
  },
};

export default configurations[process.env.NODE_ENV];
