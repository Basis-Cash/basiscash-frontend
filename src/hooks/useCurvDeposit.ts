import { useCallback } from 'react';
import useBasisCash from './useBasisCash';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import { parseUnits } from 'ethers/lib/utils';

const useCurvDeposit = () => {
  const basisCash = useBasisCash();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleDeposit = useCallback(
    (mic2Amount: string, usdtAmount: string) => {
      const mic2AmountBn = parseUnits(mic2Amount, 18);
      const usdtAmountBn = parseUnits(usdtAmount, 6);
      handleTransactionReceipt(
        basisCash.depositCurvPool(mic2AmountBn, usdtAmountBn),
        `Deposit ${mic2Amount} MIC2 and ${usdtAmount} USDT to Curv Pool`
      );
    },
    [basisCash],
  );
  return { onDeposit: handleDeposit };
};

export default useCurvDeposit;
