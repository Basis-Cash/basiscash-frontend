import { useCallback } from 'react';
import useBasisCash from './useBasisCash';
import { Bank } from '../basis-cash';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useRedeem = (bank: Bank) => {
  const basisCash = useBasisCash();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleRedeem = useCallback(() => {
    handleTransactionReceipt(basisCash.exit(bank.contract), `Redeem ${bank.contract}`);
  }, [bank, basisCash]);

  return { onRedeem: handleRedeem };
};

export default useRedeem;
