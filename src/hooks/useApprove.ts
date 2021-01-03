import { BigNumber, ethers } from 'ethers';
import { useCallback, useMemo } from 'react';
import ERC20 from '../basis-cash/ERC20';
import { useHasPendingApproval, useTransactionAdder } from '../state/transactions/hooks';
import useAllowance from './useAllowance';

const APPROVE_AMOUNT = ethers.constants.MaxUint256;
const APPROVE_EBSE_AMOUNT = BigNumber.from('1000000000000000000000000');

export enum ApprovalState {
  UNKNOWN,
  NOT_APPROVED,
  PENDING,
  APPROVED,
}

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
function useApprove(token: ERC20, spender: string): [ApprovalState, () => Promise<void>] {
  const pendingApproval = useHasPendingApproval(token.address, spender);
  const currentAllowance = useAllowance(token, spender, pendingApproval);

  // check the current approval status
  const approvalState: ApprovalState = useMemo(() => {
    // we might not have enough data to know whether or not we need to approve
    if (!currentAllowance) return ApprovalState.UNKNOWN;

    // amountToApprove will be defined if currentAllowance is
    return currentAllowance.lt(APPROVE_EBSE_AMOUNT)
      ? pendingApproval
        ? ApprovalState.PENDING
        : ApprovalState.NOT_APPROVED
      : ApprovalState.APPROVED;
  }, [currentAllowance, pendingApproval]);

  const addTransaction = useTransactionAdder();

  const approve = useCallback(async (): Promise<void> => {
    if (approvalState !== ApprovalState.NOT_APPROVED) {
      console.error('approve was called unnecessarily');
      return;
    }

    const response = await token.approve(spender, APPROVE_AMOUNT);
    addTransaction(response, {
      summary: `Approve ${token.symbol}`,
      approval: {
        tokenAddress: token.address,
        spender: spender,
      },
    });
  }, [approvalState, token, spender, addTransaction]);

  return [approvalState, approve];
}

export default useApprove;
