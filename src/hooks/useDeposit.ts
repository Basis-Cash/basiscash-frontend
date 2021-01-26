import { useCallback } from 'react';
import useBasisCash from './useBasisCash';
import { Vault } from '../basis-cash';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import { parseUnits } from 'ethers/lib/utils';

const useDeposit = (vault: Vault) => {
  const basisCash = useBasisCash();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleDeposit = useCallback(
    (amount: string) => {
      const amountBn = parseUnits(amount, vault.token.decimal);
      handleTransactionReceipt(
        basisCash.deposit(vault.contract, amountBn),
        `Deposit ${amount} ${vault.tokenName} to ${vault.contract}`,
      );
    },
    [vault, basisCash],
  );
  return { onDeposit: handleDeposit };
};

export default useDeposit;
