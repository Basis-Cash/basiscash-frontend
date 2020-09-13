import React from 'react';
import styled from 'styled-components';
import { useWallet } from 'use-wallet';
import Button from '../../Button';
import config from '../../../config';
import usePendingTransactions from '../../../hooks/usePendingTransactions';

interface TxButtonProps {}

const TxButton: React.FC<TxButtonProps> = () => {
  const { account } = useWallet();
  const pendingTransactions = usePendingTransactions();
  const transactionRef = pendingTransactions.length === 1
    ? `${config.etherscanUrl}/tx/${pendingTransactions[0].hash}`
    : `${config.etherscanUrl}/address/${account}`;

  return (
    <>
      {!!account && !!pendingTransactions.length ? (
        <StyledTxButton>
          <Button
            size="sm"
            text={`${pendingTransactions.length} Transaction(s)`}
            href={transactionRef}
          />
        </StyledTxButton>
      ) : null}
    </>
  );
};

const StyledTxButton = styled.div`
  margin-right: ${(props) => props.theme.spacing[4]}px;
`;

export default TxButton;
