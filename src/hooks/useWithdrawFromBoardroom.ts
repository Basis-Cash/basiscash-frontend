import { useCallback } from 'react';
import useBasisCash from './useBasisCash';
import { Bank } from '../basis-cash';
import { useTransactionAdder } from '../state/transactions/hooks';
import { BigNumber } from 'ethers';

const useWithdrawFromBoardroom = () => {
  const basisCash = useBasisCash();
  const addTransaction = useTransactionAdder();
  const handleWithdraw = useCallback(
    async (amount: string) => {
      const result = await basisCash.withdrawShareFromBoardroom(BigNumber.from(amount));
      addTransaction(result, {
        summary: `Withdraw ${amount} BAS from the boardroom`,
      });
    },
    [basisCash, addTransaction],
  );
  return { onWithdraw: handleWithdraw };
};

export default useWithdrawFromBoardroom;
