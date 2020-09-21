import { useCallback } from 'react';
import useBasisCash from './useBasisCash';
import { useTransactionAdder } from '../state/transactions/hooks';
import { Bank } from '../basis-cash';

const useHarvest = (bank: Bank) => {
  const basisCash = useBasisCash();
  const addTransaction = useTransactionAdder();

  const handleReward = useCallback(async () => {
    const tx = await basisCash.exit(bank.contract);
    addTransaction(tx, { summary: `Harvest ${bank.earnTokenName} from ${bank.contract}` });
  }, [bank, basisCash, addTransaction]);

  return { onReward: handleReward };
};

export default useHarvest;
