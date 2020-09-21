import React, { useMemo } from 'react';
import styled from 'styled-components';
import useTokenBalance from '../../../hooks/useTokenBalance';
import { getDisplayBalance } from '../../../utils/formatBalance';

import Button from '../../Button';
import Label from '../../Label';
import Modal, { ModalProps } from '../../Modal';
import ModalTitle from '../../ModalTitle';
import useBasisCash from '../../../hooks/useBasisCash';
import TokenSymbol from '../../TokenSymbol';

const AccountModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const basisCash = useBasisCash();

  const bacBalance = useTokenBalance(basisCash.BAC);
  const displayBacBalance = useMemo(() => getDisplayBalance(bacBalance), [bacBalance]);

  const basBalance = useTokenBalance(basisCash.BAS);
  const displayBasBalance = useMemo(() => getDisplayBalance(basBalance), [basBalance]);

  const babBalance = useTokenBalance(basisCash.BAB);
  const displayBabBalance = useMemo(() => getDisplayBalance(babBalance), [babBalance]);

  return (
    <Modal>
      <ModalTitle text="My Wallet" />

      <Balances>
        <StyledBalanceWrapper>
          <TokenSymbol symbol="BAC" />
          <StyledBalance>
            <StyledValue>{displayBacBalance}</StyledValue>
            <Label text="BAC Available" />
          </StyledBalance>
        </StyledBalanceWrapper>

        <StyledBalanceWrapper>
          <TokenSymbol symbol="BAS" />
          <StyledBalance>
            <StyledValue>{displayBasBalance}</StyledValue>
            <Label text="BAS Available" />
          </StyledBalance>
        </StyledBalanceWrapper>

        <StyledBalanceWrapper>
          <TokenSymbol symbol="BAB" />
          <StyledBalance>
            <StyledValue>{displayBabBalance}</StyledValue>
            <Label text="BAB Available" />
          </StyledBalance>
        </StyledBalanceWrapper>
      </Balances>

      <StyledSpacer />
      <Button
        href=""
        text="More info"
      />
    </Modal>
  )
}

const StyledSpacer = styled.div`
  height: ${props => props.theme.spacing[4]}px;
  width: ${props => props.theme.spacing[4]}px;
`

const StyledValue = styled.div`
  color: ${props => props.theme.color.grey[300]};
  font-size: 30px;
  font-weight: 700;
`

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const Balances = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: ${props => props.theme.spacing[4]}px;
`

const StyledBalanceWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 0 ${props => props.theme.spacing[3]}px;
`

const StyledBalanceIcon = styled.div`
  font-size: 36px;
  margin-right: ${props => props.theme.spacing[3]}px;
`

const StyledBalanceActions = styled.div`
  align-items: center;
  display: flex;
  margin-top: ${props => props.theme.spacing[4]}px;
`

export default AccountModal