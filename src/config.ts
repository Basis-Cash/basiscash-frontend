import { ChainId } from '@uniswap/sdk';
import { Configuration } from './basis-cash/config';
import { BankInfo } from './basis-cash';

const configurations: { [env: string]: Configuration } = {
  development: {
    chainId: ChainId.ROPSTEN,
    etherscanUrl: 'https://ropsten.etherscan.io',
    defaultProvider: 'wss://ropsten.infura.io/ws/v3/d3bcb3c54e8c49a7bd1a9b6773e65bbe',
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
    bondLaunchesAt: new Date('2020-12-04T00:00:00Z'),
    boardroomLaunchesAt: new Date('2020-12-04T00:00:00Z'),
  },
  production: {
    chainId: ChainId.MAINNET,
    etherscanUrl: 'https://etherscan.io',
    defaultProvider: 'wss://mainnet.infura.io/ws/v3/d3bcb3c54e8c49a7bd1a9b6773e65bbe',
    // TODO: replace with real mainnet deployment
    deployments: require('./basis-cash/deployments/deployments.ropsten.json'),
    externalTokens: {
      DAI: ['0x6B175474E89094C44Da98b954EedeAC495271d0F', 18],
      YFI: ['0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e', 18],
      SUSD: ['0x57Ab1E02fEE23774580C119740129eAC7081e9D3', 18],
      USDC: ['0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6],
      USDT: ['0xdAC17F958D2ee523a2206206994597C13D831ec7', 6],
      'BAC_DAI-UNI-LPv2': ['0x6B175474E89094C44Da98b954EedeAC495271d0F', 18],
      'BAS_DAI-UNI-LPv2': ['0x6B175474E89094C44Da98b954EedeAC495271d0F', 18],
    },
    baseLaunchDate: new Date('2020-11-30T00:00:00Z'),
    bondLaunchesAt: new Date('2020-12-04T00:00:00Z'),
    boardroomLaunchesAt: new Date('2020-12-04T00:00:00Z'),
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

// TODO: uncomment on mainnet release
// export default configurations[process.env.NODE_ENV];
export default configurations.development;
