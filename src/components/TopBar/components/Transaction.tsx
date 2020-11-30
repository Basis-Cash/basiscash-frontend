import React from 'react';
import styled from 'styled-components';
import { CheckCircle, Triangle } from 'react-feather';

import MiniLoader from '../../MiniLoader';
import { TransactionDetails } from '../../../state/transactions/reducer';
import config from '../../../config';
import { RowFixed } from '../../Row';

const TransactionWrapper = styled.div`
  display: flex;
  height: 30px;
`;

const TransactionStatusText = styled.div`
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
  :hover {
    text-decoration: underline;
  }
`;

const TransactionState = styled.a<{ pending: boolean; success?: boolean }>`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none !important;
  border-radius: 0.5rem;
  padding: 0.25rem 0rem;
  font-weight: 500;
  font-size: 0.825rem;
  color: ${(props) => props.theme.color.grey[400]};
`;

const IconWrapper = styled.div<{ pending: boolean; success?: boolean }>`
  color: ${({ pending, success, theme }) =>
    pending ? theme.primary1 : success ? theme.green1 : theme.red1};
`;

interface TransactionProps {
  tx: TransactionDetails;
}

const Transaction: React.FC<TransactionProps> = ({ tx }) => {
  const summary = tx.summary;
  const pending = !tx.receipt;
  const success =
    !pending && tx && (tx.receipt?.status === 1 || typeof tx.receipt?.status === 'undefined');

  return (
    <TransactionWrapper>
      <TransactionState
        href={`${config.etherscanUrl}/tx/${tx.hash}`}
        target="_blank"
        pending={pending}
        success={success}
      >
        <RowFixed>
          <TransactionStatusText>{summary ?? tx.hash} ↗</TransactionStatusText>
        </RowFixed>
        <IconWrapper pending={pending} success={success}>
          {pending ? (
            <MiniLoader />
          ) : success ? (
            <CheckCircle size="16" />
          ) : (
            <Triangle size="16" />
          )}
        </IconWrapper>
      </TransactionState>
    </TransactionWrapper>
  );
};

export default Transaction;
