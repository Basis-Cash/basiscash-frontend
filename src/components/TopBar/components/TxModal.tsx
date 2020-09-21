import React from 'react';
import Modal, { ModalProps } from '../../Modal';
import ModalTitle from '../../ModalTitle';
import TokenSymbol from '../../TokenSymbol';
import Label from '../../Label';
import Button from '../../Button';
import { TransactionDetails } from '../../../state/transactions/reducer';
import styled from 'styled-components';
import Transaction from './Transaction';
import ModalActions from '../../ModalActions';

interface TxModalProps extends ModalProps {
  pending: TransactionDetails[];
  confirmed: TransactionDetails[];
}


const TxModal: React.FC<TxModalProps> = ({ pending, confirmed, onDismiss }) => {
  return (
    <StyledModal>
      <ModalTitle text="Transactions" />
      {pending?.length > 0 && (
        <>
          <Label text="Pending transactions" />
          <StyledTransactionList>
            {pending.map(tx => <Transaction key={tx.hash} tx={tx} />)}
          </StyledTransactionList>
        </>
      )}
      {confirmed?.length > 0 && (
        <>
          <Label text="Recent transactions" />
          <StyledTransactionList>
            {confirmed.map(tx => <Transaction key={tx.hash} tx={tx} />)}
          </StyledTransactionList>
        </>
      )}
      <ModalActions>
        <Button text="Close" onClick={onDismiss} />
      </ModalActions>
    </StyledModal>
  )
}

const StyledModal = styled(Modal)`
  width: 360px;
`;

const StyledTransactionList = styled.div`
  display: flex;
  flex-direction: column;
`;

export default TxModal;