import { useCallback } from 'react';
import useBasisCash from './useBasisCash';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import { Bank } from '../basis-cash';

const useHarvest = (bank: Bank) => {
  const basisCash = useBasisCash();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleReward = useCallback(() => {
    handleTransactionReceipt(
      basisCash.harvest(bank.contract),
      `Claim ${bank.earnTokenName} from ${bank.contract}`,
    );
  }, [bank, basisCash]);

  return { onReward: handleReward };
};

export default useHarvest;
