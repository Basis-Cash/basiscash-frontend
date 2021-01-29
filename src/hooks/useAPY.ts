import { useEffect, useState } from 'react';

import useBasisCash from './useBasisCash';
import { ContractName } from '../basis-cash';
import useShareStats from './useShareStats';
import { getFullBalance } from '../utils/formatBalance';
import useCashStats from './useCashStats';
import { APY } from '../basis-cash/types';

const getCompoundingAPY = (apr: number) => {
  return 100 * (Math.pow(1 + apr / 365, 365) - 1);
};

const useAPY = (vaultName: ContractName, poolAddr: string) => {
  const [apy, setApy] = useState<APY>({ ratio: 1 });
  const basisCash = useBasisCash();
  const misStats = useShareStats();
  const micStats = useCashStats();

  const priceUSDT = 1.0;

  const poolName =
    vaultName === 'MICUSDTVault' ? 'USDTMICLPTokenSharePool' : 'USDTMISLPTokenSharePool';
  const token = vaultName === 'MICUSDTVault' ? basisCash.BAC : basisCash.BAS;

  useEffect(() => {
    const calcApy = async () => {
      if (basisCash && micStats && misStats) {
        const priceMIS = parseFloat(misStats.priceInUSDT);
        const priceMIC = parseFloat(micStats.priceInUSDT);

        const misRewardRateBN = await basisCash.rewardRate(poolName);
        const misRewardRate = getFullBalance(misRewardRateBN);
        const misRewardsPerYear = misRewardRate * (365 * 24 * 60 * 60);
        const valueRewardedPerYear = priceMIS * misRewardsPerYear;

        const priceM = vaultName === 'MICUSDTVault' ? priceMIC : priceMIS;

        const numMInPairBN = await token.balanceOf(poolAddr);
        const numUSDTInPairBN = await basisCash.USDT.balanceOf(poolAddr);

        const numMInPair = getFullBalance(numMInPairBN);
        const numUSDTInPair = getFullBalance(numUSDTInPairBN, 6);

        const totalValueStaked = priceM * numMInPair + priceUSDT * numUSDTInPair;

        const misAPY = valueRewardedPerYear / totalValueStaked;

        const totalSupplyBN = await basisCash.totalSupply(poolName);
        const balanceBN = await basisCash.totalBalanceOfVault(vaultName);
        const vaultTotalSupplyBN = await basisCash.totalSupply(vaultName);

        const balance = getFullBalance(balanceBN);
        const ratio = balance / getFullBalance(vaultTotalSupplyBN);

        const pricePerToken = totalValueStaked / getFullBalance(totalSupplyBN);
        const tvl = pricePerToken * balance;

        setApy({ apy: getCompoundingAPY(misAPY * 0.85), tvl, pricePerToken, ratio });
      }
    };

    calcApy();
  }, [basisCash, micStats, misStats]);

  return apy;
};

export default useAPY;
