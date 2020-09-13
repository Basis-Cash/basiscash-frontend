import { ChainId } from '@uniswap/sdk';
import { Configuration } from './basis-cash/config';
import { BankInfo } from './basis-cash';

const configurations: {[env: string]: Configuration} = {
  development: {
    chainId: 5777,
    defaultProvider: 'http://localhost:8545',
    deployments: require('./basis-cash/deployments/deployments.local.json'),
    externalTokens: {
      DAI: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      YFI: '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e',
      SUSD: '0x57Ab1E02fEE23774580C119740129eAC7081e9D3',
      USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    },
    uniswapConfig: {
      provider: 'wss://mainnet.infura.io/ws/v3/d3bcb3c54e8c49a7bd1a9b6773e65bbe',
      daiAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      chainId: ChainId.MAINNET,
      isMockedPrice: true,
    },
  },
  production: {
    chainId: 1,
    defaultProvider: 'wss://mainnet.infura.io/ws/v3/57d0fd1bf341490088b7182d445fe45c',
    deployments: require('./basis-cash/deployments/deployments.local.json'),
    externalTokens: {
      DAI: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      YFI: '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e',
      SUSD: '0x57Ab1E02fEE23774580C119740129eAC7081e9D3',
      USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    },
    uniswapConfig: {
      provider: 'wss://mainnet.infura.io/ws/v3/d3bcb3c54e8c49a7bd1a9b6773e65bbe',
      daiAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      chainId: ChainId.MAINNET,
      isMockedPrice: false,
    },
  },
}

export const bankDefinitions: {[contractName: string]: BankInfo} = {
  BACDAIPool: {
    name: 'Earn BAC by DAI',
    depositTokenName: 'DAI',
    earnTokenName: 'Cash',
    icon: '💵',
    sort: 1,
  },
  BACUSDCPool: {
    name: 'Earn BAC by USDC',
    depositTokenName: 'USDC',
    earnTokenName: 'Cash',
    icon: '💲',
    sort: 2,
  },
  BACSUSDPool: {
    name: 'Earn BAC by SUSD',
    depositTokenName: 'SUSD',
    earnTokenName: 'Cash',
    icon: '💸',
    sort: 3,
  },
  BACUSDTPool: {
    name: 'Earn BAC by USDT',
    depositTokenName: 'USDT',
    earnTokenName: 'Cash',
    icon: '🅣',
    sort: 4,
  },
  BACYFIPool: {
    name: 'Earn BAC by YFI',
    depositTokenName: 'YFI',
    earnTokenName: 'Cash',
    icon: '🐋',
    sort: 7,
  },
  DAIBACLPTokenSharePool: {
    name: 'DAI_BAC_UNI_LP',
    depositTokenName: 'DAI_BAC-UNI-LP v2',
    earnTokenName: 'Share',
    icon: '🦄',
    sort: 5,
  },
  DAIBASLPTokenSharePool: {
    name: 'DAI_BAS_UNI_LP',
    depositTokenName: 'DAI_BAS-UNI-LP v2',
    earnTokenName: 'Share',
    icon: '🌈',
    sort: 6,
  },
};


export default configurations[process.env.NODE_ENV];
