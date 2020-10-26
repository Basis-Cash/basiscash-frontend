import { useCallback } from 'react';
import useBasisCash from './useBasisCash';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useRedeemOnBoardroom = () => {
  const basisCash = useBasisCash();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleRedeem = useCallback(() => {
    handleTransactionReceipt(basisCash.exitFromBoardroom(), 'Redeem BAS from Boardroom');
  }, [basisCash]);
  return { onRedeem: handleRedeem };
};

export default useRedeemOnBoardroom;
