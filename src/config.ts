import { ChainId } from '@uniswap/sdk';
import { Configuration } from './basis-cash/config';
import { BankInfo } from './basis-cash';

const configurations: { [env: string]: Configuration } = {
  development: {
    chainId: ChainId.ROPSTEN,
    etherscanUrl: 'https://ropsten.etherscan.io',
    defaultProvider: 'https://ropsten.infura.io/v3/b936b38c55244c2d8f9e4f7a0b45eb9f',
    deployments: require('./basis-cash/deployments/deployments.ropsten.json'),
    externalTokens: {
      DAI: ['0xd4A2e76D12f8AAb562f8072Ce029add7f25239d5', 18],
      yCRV: ['0xd4A2e76D12f8AAb562f8072Ce029add7f25239d5', 18],
      SUSD: ['0xd4A2e76D12f8AAb562f8072Ce029add7f25239d5', 18],
      USDC: ['0xd4A2e76D12f8AAb562f8072Ce029add7f25239d5', 18],
      USDT: ['0xd4A2e76D12f8AAb562f8072Ce029add7f25239d5', 18],
      'BAC_DAI-UNI-LPv2': ['0xA78Bf231059bCAfc8Ca37164FC71a0D2C39DFf88', 18],
      'BAS_DAI-UNI-LPv2': ['0x1e794b54b5EC6Ff44A4070469Db54efB870FC248', 18],
    },
    baseLaunchDate: new Date('2020-11-26T00:00:00Z'),
    bondLaunchesAt: new Date('2020-12-05T00:00:00Z'),
    boardroomLaunchesAt: new Date('2020-12-05T00:00:00Z'),
    refreshInterval: 10000,
  },
  production: {
    chainId: ChainId.MAINNET,
    etherscanUrl: 'https://etherscan.io',
    defaultProvider: 'https://mainnet.infura.io/v3/b936b38c55244c2d8f9e4f7a0b45eb9f',
    deployments: require('./basis-cash/deployments/deployments.mainnet.json'),
    externalTokens: {
      DAI: ['0x6B175474E89094C44Da98b954EedeAC495271d0F', 18],
      yCRV: ['0xdf5e0e81dff6faf3a7e52ba697820c5e32d806a8', 18],
      SUSD: ['0x57Ab1E02fEE23774580C119740129eAC7081e9D3', 18],
      USDC: ['0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6],
      USDT: ['0xdAC17F958D2ee523a2206206994597C13D831ec7', 6],
      'BAC_DAI-UNI-LPv2': ['0xd4405F0704621DBe9d4dEA60E128E0C3b26bddbD', 18],
      'BAS_DAI-UNI-LPv2': ['0x0379dA7a5895D13037B6937b109fA8607a659ADF', 18],
    },
    baseLaunchDate: new Date('2020-11-29T23:00:00Z'),
    bondLaunchesAt: new Date('2020-12-05T00:00:00Z'),
    boardroomLaunchesAt: new Date('2020-12-05T00:00:00Z'),
    refreshInterval: 30000,
  },
};

export const bankDefinitions: { [contractName: string]: BankInfo } = {
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

export default configurations[process.env.NODE_ENV || 'production'];
