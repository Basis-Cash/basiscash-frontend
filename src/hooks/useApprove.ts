import { TransactionResponse } from '@ethersproject/providers';
import { Contract } from 'ethers';
import { useCallback, useMemo } from 'react';
import { useTransactionAdder, useHasPendingApproval } from '../state/transactions/hooks';
import useAllowance from './useAllowance';
import { ethers } from 'ethers';

const APPROVE_AMOUNT = ethers.constants.MaxUint256;

export enum ApprovalState {
  UNKNOWN,
  NOT_APPROVED,
  PENDING,
  APPROVED,
}

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
function useApprove(
  tokenContract: Contract,
  poolContract: Contract,
  tokenName: string,
): [ApprovalState, () => Promise<void>] {
  const currentAllowance = useAllowance(tokenContract, poolContract);
  const pendingApproval = useHasPendingApproval(tokenContract.address, poolContract.address);

  // check the current approval status
  const approvalState: ApprovalState = useMemo(() => {
    // we might not have enough data to know whether or not we need to approve
    if (!currentAllowance) return ApprovalState.UNKNOWN;

    // amountToApprove will be defined if currentAllowance is
    return currentAllowance.lt(APPROVE_AMOUNT)
      ? pendingApproval
        ? ApprovalState.PENDING
        : ApprovalState.NOT_APPROVED
      : ApprovalState.APPROVED;
  }, [currentAllowance, pendingApproval, poolContract]);

  const addTransaction = useTransactionAdder();

  const approve = useCallback(async (): Promise<void> => {
    if (approvalState !== ApprovalState.NOT_APPROVED) {
      console.error('approve was called unnecessarily');
      return;
    }

    return tokenContract
      .approve(poolContract.address, APPROVE_AMOUNT)
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: `Approve ${tokenName}`,
          approval: {
            tokenAddress: tokenContract.address,
            spender: poolContract.address,
          },
        });
      })
      .catch((error: Error) => {
        console.debug('Failed to approve token', error);
        throw error;
      });
  }, [approvalState, tokenContract, poolContract, addTransaction]);

  return [approvalState, approve];
}

export default useApprove;
