import { Deployments } from './deployments';

const configurations: {[env: string]: Configuration} = {
  development: {
    endpoint: 'http://localhost:8554',
    deployments: require('./deployments/deployments.local.json'),
  },
  production: {
    endpoint: 'http://localhost:8554',
    deployments: require('./deployments/deployments.local.json'),
  },
}

export type Configuration = {
  endpoint: string,
  deployments: Deployments,
  config?: EthereumConfig,
};

type EthereumConfig = {
  testing: boolean,
  autoGasMultiplier: number,
  defaultConfirmations: number,
  defaultGas: string,
  defaultGasPrice: string,
  ethereumNodeTimeout: number,
};

export const defaultConfiguration = configurations[process.env.NODE_ENV];

export const defaultEthereumConfig = {
  testing: false,
  autoGasMultiplier: 1.5,
  defaultConfirmations: 1,
  defaultGas: "6000000",
  defaultGasPrice: "1000000000000",
  ethereumNodeTimeout: 10000,
}
