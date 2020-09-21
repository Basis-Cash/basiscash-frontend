import { useCallback } from 'react';
import useBasisCash from './useBasisCash';
import { Bank } from '../basis-cash';
import { useTransactionAdder } from '../state/transactions/hooks';

const useWithdraw = (bank: Bank) => {
  const basisCash = useBasisCash();
  const addTransaction = useTransactionAdder();
  const handleWithdraw = useCallback(
    async (amount: string) => {
      const result = await basisCash.unstake(bank.contract, amount);
      addTransaction(result, {
        summary: `Withdraw ${amount} ${bank.depositTokenName} from ${bank.contract}`,
      });
    },
    [bank, basisCash, addTransaction],
  );
  return { onWithdraw: handleWithdraw };
};

export default useWithdraw;
