import { useCallback } from 'react';
import useBasisCash from './useBasisCash';
import { Bank} from '../basis-cash';
import { useTransactionAdder } from '../state/transactions/hooks';

const useStake = (bank: Bank) => {
  const basisCash = useBasisCash();
  const addTransaction = useTransactionAdder();

  const handleStake = useCallback(
    async (amount: string) => {
      const tx = await basisCash.stake(bank.contract, amount);
      addTransaction(tx, {
        summary: `Stake ${amount} ${bank.depositTokenName} to ${bank.contract}`,
      });
    },
    [bank, basisCash, addTransaction],
  );
  return { onStake: handleStake };
};

export default useStake;
