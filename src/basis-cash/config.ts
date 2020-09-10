import { Deployments } from './deployments';
import { ChainId, Token } from '@uniswap/sdk';

const configurations: {[env: string]: Configuration} = {
  development: {
    endpoint: 'http://localhost:8545',
    deployments: require('./deployments/deployments.local.json'),
    uniswapConfig: {
      daiAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      chainId: ChainId.MAINNET,
      isMockedPrice: true,
    },
  },
  production: {
    endpoint: 'http://localhost:8545',
    deployments: require('./deployments/deployments.local.json'),
    uniswapConfig: {
      daiAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      chainId: ChainId.MAINNET,
      isMockedPrice: false,
    },
  },
}

export type Configuration = {
  endpoint: string,
  deployments: Deployments,
  config?: EthereumConfig,
  uniswapConfig?: UniswapConfig,
};

type EthereumConfig = {
  testing: boolean,
  autoGasMultiplier: number,
  defaultConfirmations: number,
  defaultGas: string,
  defaultGasPrice: string,
  ethereumNodeTimeout: number,
};

type UniswapConfig = {
  daiAddress: string;
  chainId: ChainId;
  isMockedPrice?: boolean;
}

export const defaultConfiguration = configurations[process.env.NODE_ENV];

export const defaultEthereumConfig = {
  testing: false,
  autoGasMultiplier: 1.5,
  defaultConfirmations: 1,
  defaultGas: "6000000",
  defaultGasPrice: "1000000000000",
  ethereumNodeTimeout: 10000,
}
