import { useCallback } from 'react';
import useBasisCash from './useBasisCash';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useHarvestEpochFromBoardroom = (epoch: number) => {
  const basisCash = useBasisCash();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleReward = useCallback(() => {
    handleTransactionReceipt(basisCash.harvestEpochCashFromBoardroom(epoch), 'Claim MIC2 from Boardroom');
  }, [basisCash]);

  return { onReward: handleReward };
};

export default useHarvestEpochFromBoardroom;
