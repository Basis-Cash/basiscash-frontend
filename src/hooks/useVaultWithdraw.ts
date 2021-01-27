import { useCallback } from 'react';
import useBasisCash from './useBasisCash';
import { Vault } from '../basis-cash';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import { parseUnits } from 'ethers/lib/utils';

const useWithdraw = (vault: Vault) => {
  const basisCash = useBasisCash();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleWithdraw = useCallback(
    (amount: string) => {
      const amountBn = parseUnits(amount, vault.token.decimal);
      handleTransactionReceipt(
        basisCash.unstake(vault.contract, amountBn),
        `Withdraw ${amount} ${vault.tokenName} from ${vault.contract}`,
      );
    },
    [vault, basisCash],
  );
  return { onWithdraw: handleWithdraw };
};

export default useWithdraw;
