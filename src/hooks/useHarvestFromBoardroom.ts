import { useCallback } from 'react';
import useBasisCash from './useBasisCash';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useHarvestFromBoardroom = () => {
  const basisCash = useBasisCash();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleReward = useCallback(() => {
    handleTransactionReceipt(basisCash.harvestCashFromBoardroom(), 'Claim MIC2 from Boardroom');
  }, [basisCash]);

  return { onReward: handleReward };
};

export default useHarvestFromBoardroom;
