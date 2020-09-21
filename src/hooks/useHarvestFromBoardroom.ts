import { useCallback } from 'react';
import useBasisCash from './useBasisCash';
import { useTransactionAdder } from '../state/transactions/hooks';

const useHarvestFromBoardroom = () => {
  const basisCash = useBasisCash();
  const addTransaction = useTransactionAdder();

  const handleReward = useCallback(async () => {
    const tx = await basisCash.harvestCashFromBoardroom();
    addTransaction(tx, { summary: 'Harvest BAC from Boardroom' });
  }, [basisCash, addTransaction]);

  return { onReward: handleReward };
};

export default useHarvestFromBoardroom;
