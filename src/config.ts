import { ChainId } from '@uniswap/sdk';
import { BankInfo } from './basis-cash';
import { Configuration } from './basis-cash/config';

const configurations: { [env: string]: Configuration } = {
  development: {
    chainId: ChainId.KOVAN,
    etherscanUrl: 'https://etherscan.io',
    defaultProvider: 'https://kovan.infura.io/v3/06ecf536272c43c78adfba29b908a68d',
    deployments: require('./basis-cash/deployments/deployments.kovan.json'),
    externalTokens: {
      WBTC: ['0xf66fedfe24fc5f0b548d5b28ac4608ddf87648bb', 8],
      BAC: ['0x3449fc1cd036255ba1eb19d65ff4ba2b8903a69a', 18],
      HBTC: ['0x0316EB71485b0Ab14103307bf65a021042c6d380', 18],
      RenBTC: ['0xeb4c2781e4eba804ce9a9803c67d0893436bb27d', 8],
      SBTC: ['0xfe18be6b3bd88a2d2a7f928d00292e7a9963cfc6', 18],
      BADGER: ['0x3472A5A71965499acd81997a54BBA8D852C6E53d', 18],
      'EBTC_WBTC-UNI-LPv2': ['0xe649f74489242e6c7b9e0ac0189e6d0bb91187a6', 18],
      'EBS_WBTC-UNI-LPv2': ['0x03e43d93b4235825ec27f4f61cd260fe410f0f64', 18],
    },
    baseLaunchDate: new Date('2020-01-03T00:00:00Z'),
    bondLaunchesAt: new Date('2020-01-08T15:00:00Z'),
    boardroomLaunchesAt: new Date('2020-01-08T00:00:00Z'),
    refreshInterval: 10000,
    gasLimitMultiplier: 1.1,
  },
  production: {
    chainId: ChainId.MAINNET,
    etherscanUrl: 'https://etherscan.io',
    defaultProvider: 'https://mainnet.infura.io/v3/06ecf536272c43c78adfba29b908a68d',
    deployments: require('./basis-cash/deployments/deployments.mainnet.json'),
    externalTokens: {
      WBTC: ['0x2260fac5e5542a773aa44fbcfedf7c193bc2c599', 8],
      BAC: ['0x3449fc1cd036255ba1eb19d65ff4ba2b8903a69a', 18],
      HBTC: ['0x0316EB71485b0Ab14103307bf65a021042c6d380', 18],
      RenBTC: ['0xeb4c2781e4eba804ce9a9803c67d0893436bb27d', 8],
      SBTC: ['0xfe18be6b3bd88a2d2a7f928d00292e7a9963cfc6', 18],
      BADGER: ['0x3472A5A71965499acd81997a54BBA8D852C6E53d', 18],
      'EBTC_WBTC-UNI-LPv2': ['0xe649f74489242e6c7b9e0ac0189e6d0bb91187a6', 18],
      'EBS_WBTC-UNI-LPv2': ['0x03e43d93b4235825ec27f4f61cd260fe410f0f64', 18],
    },
    baseLaunchDate: new Date('2020-01-03T00:00:00Z'),
    bondLaunchesAt: new Date('2020-01-08T15:00:00Z'),
    boardroomLaunchesAt: new Date('2020-01-08T00:00:00Z'),
    refreshInterval: 30000,
    gasLimitMultiplier: 1.7,
  },
};

export const bankDefinitions: { [contractName: string]: BankInfo } = {
  EBTCDAIPool: {
    name: 'Earn EBTC by DAI',
    contract: 'EBTCDAIPool',
    depositTokenName: 'DAI',
    earnTokenName: 'EBTC',
    finished: false,
    sort: 3,
  },
  EBTCBACPool: {
    name: 'Earn EBTC by BAC',
    contract: 'EBTCBACPool',
    depositTokenName: 'BAC',
    earnTokenName: 'EBTC',
    finished: false,
    sort: 4,
  },
  EBTCSBTCPool: {
    name: 'Earn EBTC by SBTC',
    contract: 'EBTCSBTCPool',
    depositTokenName: 'SBTC',
    earnTokenName: 'EBTC',
    finished: false,
    sort: 5,
  },
  EBTCHBTCPool: {
    name: 'Earn EBTC by Huobi BTC',
    contract: 'EBTCHBTCPool',
    depositTokenName: 'HBTC',
    earnTokenName: 'EBTC',
    finished: false,
    sort: 6,
  },
  EBTCRenBTCPool: {
    name: 'Earn EBTC by RenBTC',
    contract: 'EBTCRenBTCPool',
    depositTokenName: 'RenBTC',
    earnTokenName: 'EBTC',
    finished: false,
    sort: 7,
  },
  EBTCBADGERPool: {
    name: 'Earn EBTC by Badger',
    contract: 'EBTCBADGERPool',
    depositTokenName: 'BADGER',
    earnTokenName: 'EBTC',
    finished: false,
    sort: 8,
  },
  WBTCEBTCLPTokenSharePool: {
    name: 'Earn EBS by EBTC-WBTC-LP',
    contract: 'DAIEBTCLPTokenSharePool',
    depositTokenName: 'EBTC_WBTC-UNI-LPv2',
    earnTokenName: 'EBS',
    finished: false,
    sort: 1,
  },
  WBTCEBSLPTokenSharePool: {
    name: 'Earn EBS by EBS-WBTC-LP',
    contract: 'DAIEBSLPTokenSharePool',
    depositTokenName: 'EBS_WBTC-UNI-LPv2',
    earnTokenName: 'EBS',
    finished: false,
    sort: 2,
  },
};

export default configurations[process.env.NODE_ENV || 'development'];
