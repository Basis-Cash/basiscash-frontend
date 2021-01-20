import { ChainId } from '@uniswap/sdk';
import { Configuration } from './jam-cash/config';
import { BankInfo } from './jam-cash';
import { formatUnits } from 'ethers/lib/utils';
import { BigNumber } from 'ethers';

const configurations: { [env: string]: Configuration } = {
  development: {
    chainId: ChainId.RINKEBY,
    etherscanUrl: 'https://rinkeby.etherscan.io',
    defaultProvider: 'https://rinkeby.infura.io/v3/1164ab0bd2f24c889d09e55dc0fc8137',
    deployments: require('./jam-cash/deployments/deployments.rinkeby.json'),
    externalTokens: {
      DAI: ['0x6f5390a8cd02d83b23c5f1d594bffb9050eb4ca3', 18], // ? TODO
      USDC: ['0x4dbcdf9b62e891a7cec5a2568c3f4faf9e8abe2b', 6], // ? TODO
      AC: ['0xf14ca9df0a7d16f7ee3403b18724f89f3f1f95fd', 18], // ? TODO
      FRAX: ['0xa23a5d188c8e2f4b3e029815a793972c58d89890', 18], // ? TODO
      // ESD: ['0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6], // ? TODO
      // DSD: ['0xdAC17F958D2ee523a2206206994597C13D831ec7', 6], // ? TODO
      'JAM_USDC-UNI-LPv2': ['0x8C8b3Be3a2471c044c0FF1ff4e68acfC0e7438C4', 18], // ? TODO
      // 'JAZZ_DAI-UNI-LPv2': ['0x2111eD43bC9c0acd3Da453e6ac743cb3802Eb904', 18], // ? TODO
      JAZZJAM: ['0xCf8aA9B927d71845Aab4F428032eF698eB481b51', 18]
    },
    baseLaunchDate: new Date('2021-01-19T00:00:00Z'),
    bondLaunchesAt: new Date('2021-01-16T00:00:00Z'),
    boardroomLaunchesAt: new Date('2021-01-18T00:00:00Z'),
    refreshInterval: 10000,
    gasLimitMultiplier: 1.1,
  },
  production: {
    chainId: ChainId.MAINNET,
    etherscanUrl: 'https://etherscan.io',
    defaultProvider: 'https://mainnet.infura.io/v3/1164ab0bd2f24c889d09e55dc0fc8137',
    deployments: require('./jam-cash/deployments/deployments.mainnet.json'),
    externalTokens: {
      DAI: ['0x6B175474E89094C44Da98b954EedeAC495271d0F', 18], // ? TODO
      USDC: ['0x6B175474E89094C44Da98b954EedeAC495271d0F', 18], // ? TODO
      AC: ['0xf14ca9df0a7d16f7ee3403b18724f89f3f1f95fd', 18], // ? TODO
      FRAX: ['0x57Ab1E02fEE23774580C119740129eAC7081e9D3', 18], // ? TODO
      ESD: ['0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6], // ? TODO
      DSD: ['0xdAC17F958D2ee523a2206206994597C13D831ec7', 6], // ? TODO
      'JAM_DAI-UNI-LPv2': ['0xd4405F0704621DBe9d4dEA60E128E0C3b26bddbD', 18], // ? TODO
      'JAZZ_DAI-UNI-LPv2': ['0x0379dA7a5895D13037B6937b109fA8607a659ADF', 18], // ? TODO
    },
    baseLaunchDate: new Date('2020-11-29T23:00:00Z'),
    bondLaunchesAt: new Date('2020-12-05T00:00:00Z'),
    boardroomLaunchesAt: new Date('2020-12-11T00:00:00Z'),
    refreshInterval: 30000,
    gasLimitMultiplier: 1.7,
  },
};

export const bankDefinitions: { [contractName: string]: BankInfo } = {
  JAMDAIPool: {
    name: 'Earn JAM by DAI',
    contract: 'JAMDAIPool',
    depositTokenName: 'DAI',
    earnTokenName: 'JAM',
    finished: false,
    sort: 3,
  },
  JAMUSDCPool: {
    name: 'Earn JAM by USDC',
    contract: 'JAMUSDCPool',
    depositTokenName: 'USDC',
    earnTokenName: 'JAM',
    finished: false,
    sort: 4,
  },
  JAMACPool: {
    name: 'Earn JAM by AC',
    contract: 'JAMACPool',
    depositTokenName: 'AC',
    earnTokenName: 'JAM',
    finished: false,
    sort: 5,
  },
  JAMFRAXPool: {
    name: 'Earn JAM by FRAX',
    contract: 'JAMFRAXPool',
    depositTokenName: 'FRAX',
    earnTokenName: 'JAM',
    finished: false,
    sort: 6,
  },
  JAZZJAMPool: {
    name: 'Earn JAZZ by JAM',
    contract: 'JAZZJAMPool',
    depositTokenName: 'JAM',
    earnTokenName: 'JAZZ',
    finished: false,
    sort: 2,
  },
  // JAMESDPool: {
  //   name: 'Earn JAM by ESD',
  //   contract: 'JAMESDPool',
  //   depositTokenName: 'ESD',
  //   earnTokenName: 'JAM',
  //   finished: true,
  //   sort: 7,
  // },
  // JAMDSDPool: {
  //   name: 'Earn JAM by DSD',
  //   contract: 'JAMDSDPool',
  //   depositTokenName: 'DSD',
  //   earnTokenName: 'JAM',
  //   finished: true,
  //   sort: 7,
  // },
  USDCJAMLPTokenSharePool: {
    name: 'Earn JAZZ by JAM-USDC-LP',
    contract: 'USDCJAMLPTokenSharePool',
    depositTokenName: 'JAM_USDC-UNI-LPv2',
    earnTokenName: 'JAZZ',
    finished: false,
    sort: 1,
  },
  // DAIJAZZLPTokenSharePool: {
  //   name: 'Earn JAZZ by JAZZ-DAI-LP',
  //   contract: 'DAIJAZZLPTokenSharePool',
  //   depositTokenName: 'JAZZ_DAI-UNI-LPv2',
  //   earnTokenName: 'JAZZ',
  //   finished: false,
  //   sort: 2,
  // },
};

export default configurations[process.env.NODE_ENV || "development"];
