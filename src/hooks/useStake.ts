import { useCallback } from 'react';

import { Contract } from 'web3-eth-contract';
import useBasisCash from './useBasisCash';

const useStake = (poolContract: Contract, tokenName: string) => {
  const basisCash = useBasisCash();
  const handleStake = useCallback(
    async (amount: string) => {
      await basisCash.stake(poolContract, amount, tokenName);
    },
    [poolContract, basisCash],
  );

  return { onStake: handleStake };
};

export default useStake;
