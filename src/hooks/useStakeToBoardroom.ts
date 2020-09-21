import { useCallback } from 'react';
import useBasisCash from './useBasisCash';
import { Bank } from '../basis-cash';
import { useTransactionAdder } from '../state/transactions/hooks';
import { BigNumber } from 'ethers';

const useStakeToBoardroom = () => {
  const basisCash = useBasisCash();
  const addTransaction = useTransactionAdder();

  const handleStake = useCallback(
    async (amount: string) => {
      const tx = await basisCash.stakeShareToBoardroom(BigNumber.from(amount));
      addTransaction(tx, { summary: `Stake ${amount} BAS to the boardroom` });
    },
    [basisCash, addTransaction],
  );
  return { onStake: handleStake };
};

export default useStakeToBoardroom;
