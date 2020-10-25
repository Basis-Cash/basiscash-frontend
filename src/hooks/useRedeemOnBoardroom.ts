import { useCallback } from 'react';
import useBasisCash from './useBasisCash';
import { useTransactionAdder } from '../state/transactions/hooks';

const useRedeemOnBoardroom = () => {
  const basisCash = useBasisCash();
  const addTransaction = useTransactionAdder();

  const handleRedeem = useCallback(async () => {
    const tx = await basisCash.exitFromBoardroom();
    addTransaction(tx, { summary: `Redeem BAS from Boardroom` });
  }, [basisCash, addTransaction]);

  return { onRedeem: handleRedeem };
};

export default useRedeemOnBoardroom;
