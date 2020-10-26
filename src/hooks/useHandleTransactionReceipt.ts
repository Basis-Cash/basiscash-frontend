import { useCallback } from 'react';
import { TransactionResponse } from '@ethersproject/providers';
import { useTransactionAdder } from '../state/transactions/hooks';
import { useAddPopup } from '../state/application/hooks';

function useHandleTransactionReceipt(): (
  promise: Promise<TransactionResponse>,
  summary: string,
) => void {
  const addTransaction = useTransactionAdder();
  const addPopup = useAddPopup();

  return useCallback(
    (promise: Promise<TransactionResponse>, summary: string) => {
      promise
        .then((tx) => addTransaction(tx, { summary }))
        .catch((err) => {
          if (err.message.includes('User denied')) {
            // User denied transaction signature on MetaMask.
            return;
          }
          const message = `Unable to ${summary[0].toLowerCase()}${summary.slice(1)}`;
          console.error(`${message}: ${err.message || err.stack}`);
          addPopup({ error: { message, stack: err.message || err.stack } });
        });
    },
    [addPopup],
  );
}

export default useHandleTransactionReceipt;
