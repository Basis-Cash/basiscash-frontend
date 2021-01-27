import React from 'react';
import styled from 'styled-components';

import Button from '../../../components/Button';
import Card from '../../../components/Card';
import CardContent from '../../../components/CardContent';
import CardIcon from '../../../components/CardIcon';
import { AddIcon, RemoveIcon } from '../../../components/icons';
import IconButton from '../../../components/IconButton';
import Label from '../../../components/Label';
import Value from '../../../components/Value';

import useApprove, { ApprovalState } from '../../../hooks/useApprove';
import useModal from '../../../hooks/useModal';
import useDeposit from '../../../hooks/useDeposit';
import useDepositedBalance from '../../../hooks/useDepositedBalance';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useVaultWithdraw from '../../../hooks/useVaultWithdraw';

import { getDisplayBalance } from '../../../utils/formatBalance';

import DepositModal from './DepositModal';
import WithdrawModal from './WithdrawModal';
import TokenSymbol from '../../../components/TokenSymbol';
import { Vault } from '../../../basis-cash';

interface DepositProps {
  vault: Vault;
}

const Deposit: React.FC<DepositProps> = ({ vault }) => {
  const [approveStatus, approve] = useApprove(vault.token, vault.address);

  // TODO: reactive update of token balance
  const tokenBalance = useTokenBalance(vault.token);
  const depositedBalance = useDepositedBalance(vault.contract);

  const { onDeposit } = useDeposit(vault);
  const { onWithdraw } = useVaultWithdraw(vault);

  const [onPresentDeposit, onDismissDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      decimals={vault.token.decimal}
      onConfirm={(amount) => {
        onDeposit(amount);
        onDismissDeposit();
      }}
      tokenName={vault.tokenName}
    />,
  );

  const [onPresentWithdraw, onDismissWithdraw] = useModal(
    <WithdrawModal
      max={depositedBalance}
      decimals={vault.token.decimal}
      onConfirm={(amount) => {
        onWithdraw(amount);
        onDismissWithdraw();
      }}
      tokenName={vault.tokenName}
    />,
  );

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon>
              <TokenSymbol symbol={vault.token.symbol} size={54} />
            </CardIcon>
            <Value value={getDisplayBalance(depositedBalance, vault.token.decimal, 6)} />
            <Label text={`${vault.tokenName} Depositd`} />
          </StyledCardHeader>
          <StyledCardActions>
            {approveStatus !== ApprovalState.APPROVED ? (
              <Button
                disabled={
                  approveStatus === ApprovalState.PENDING ||
                  approveStatus === ApprovalState.UNKNOWN
                }
                onClick={approve}
                text={`Approve ${vault.tokenName}`}
              />
            ) : (
              <>
                <IconButton onClick={onPresentWithdraw}>
                  <RemoveIcon />
                </IconButton>
                <StyledActionSpacer />
                <IconButton
                  disabled={vault.finished}
                  onClick={() => (vault.finished ? null : onPresentDeposit())}
                >
                  <AddIcon />
                </IconButton>
              </>
            )}
          </StyledCardActions>
        </StyledCardContentInner>
      </CardContent>
    </Card>
  );
};

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[6]}px;
  width: 100%;
`;

const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`;

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export default Deposit;
