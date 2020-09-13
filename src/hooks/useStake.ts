import { useCallback } from 'react';

import { Contract } from 'web3-eth-contract';
import useBasisCash from './useBasisCash';
import useTransactionAdder from './useTransactionAdder';

const useStake = (poolContract: Contract, tokenName: string) => {
  const basisCash = useBasisCash();
  const { onAddTransaction } = useTransactionAdder();

  const handleStake = useCallback(
    async (amount: string) => {
      const hash = await basisCash.stake(poolContract, amount, tokenName);
      onAddTransaction({
        hash,
        description: `Stake ${amount} ${tokenName}`,
      })
    },
    [poolContract, basisCash, onAddTransaction],
  );

  return { onStake: handleStake };
};

export default useStake;
