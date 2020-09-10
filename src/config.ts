import { ChainId } from '@uniswap/sdk';
import { Configuration } from './basis-cash/config';

const configurations: {[env: string]: Configuration} = {
  development: {
    chainId: 5777,
    endpoint: 'http://localhost:8545',
    deployments: require('./basis-cash/deployments/deployments.local.json'),
    uniswapConfig: {
      daiAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      chainId: ChainId.MAINNET,
      isMockedPrice: true,
    },
  },
  production: {
    chainId: 1,
    endpoint: 'http://localhost:8545',
    deployments: require('./basis-cash/deployments/deployments.local.json'),
    uniswapConfig: {
      daiAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      chainId: ChainId.MAINNET,
      isMockedPrice: false,
    },
  },
}

export default configurations[process.env.NODE_ENV];
