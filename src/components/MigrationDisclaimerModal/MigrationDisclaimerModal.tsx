import React, { useCallback } from 'react';

import Button from '../Button';
import Modal, { ModalProps } from '..//Modal';
import ModalActions from '..//ModalActions';
import ModalTitle from '..//ModalTitle';
import styled from 'styled-components';

interface MigrationDisclaimerModalProps extends ModalProps {
  onConfirm: () => void;
  onDismiss: () => void;
}

const MigrationDisclaimerModal: React.FC<MigrationDisclaimerModalProps> = ({ onConfirm, onDismiss }) => {
  const handleConfirm = useCallback(() => {
    onConfirm();
    // onDismiss();
  }, [onConfirm, onDismiss]);
  const handleDismiss = useCallback(() => onDismiss(), [onDismiss]);

  return (
    <Modal>
      <ModalTitle text={`Migration Disclaimer`} />
      <div>
        <StyledText>
          Due to the upgrade, all Boardroom functionalities other than [Settle and withdraw] has
          been disabled for users who staked in legacy Boardrooms. Please withdraw all balances
          from the previous boardroom after the update.
        </StyledText>
      </div>
      <ModalActions>
        <Button text="Cancel" variant="secondary" onClick={handleDismiss} />
        <Button text="I understand" onClick={handleConfirm} />
      </ModalActions>
    </Modal>
  );
};

const StyledText = styled.p`
  color: ${(props) => props.theme.color.grey[300]};
`;

export default MigrationDisclaimerModal;
