import { useCallback } from 'react';
import { Contract } from 'ethers';
import useBasisCash from './useBasisCash';

const useUnstake = (poolContract: Contract, tokenName: string) => {
  const basisCash = useBasisCash();
  const handleUnstake = useCallback(
    async (amount: string) => await basisCash.unstake(poolContract, amount),
    [poolContract, basisCash],
  );
  return { onUnstake: handleUnstake };
};

export default useUnstake;
