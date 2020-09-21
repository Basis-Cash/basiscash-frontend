import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useWallet } from 'use-wallet';
import Button from '../../Button';
import { isTransactionRecent, useAllTransactions } from '../../../state/transactions/hooks';
import { TransactionDetails } from '../../../state/transactions/reducer';
import useModal from '../../../hooks/useModal';
import TxModal from './TxModal';

interface TxButtonProps {}

// we want the latest one to come first, so return negative if a is after b
function newTransactionsFirst(a: TransactionDetails, b: TransactionDetails) {
  return b.addedTime - a.addedTime;
}

const TxButton: React.FC<TxButtonProps> = () => {
  const { account } = useWallet();
  const allTransactions = useAllTransactions();

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions);
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst);
  }, [allTransactions]);

  const pending = sortedRecentTransactions.filter((tx) => !tx.receipt);
  const confirmed = sortedRecentTransactions.filter((tx) => tx.receipt);

  const [onPresentTransactionModal] = useModal(
    <TxModal pending={pending} confirmed={confirmed} />
  );
  return (
    <>
      {!!account && (
        <StyledTxButton>
          <Button
            size="sm"
            text={pending.length > 0 ? `${pending.length} Transaction(s)`: `Transactions`}
            variant={pending.length > 0 ? 'secondary' : 'default'}
            onClick={() => onPresentTransactionModal()}
          />
        </StyledTxButton>
      )}
    </>
  );
};

const StyledTxButton = styled.div`
  margin-right: ${(props) => props.theme.spacing[4]}px;
`;

export default TxButton;
