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

import { getFullBalance } from '../../../utils/formatBalance';

import DepositModal from './DepositModal';
import WithdrawModal from './WithdrawModal';
import TokenSymbol from '../../../components/TokenSymbol';
import { Vault } from '../../../basis-cash';
import useAPY from '../../../hooks/useAPY';

interface DepositProps {
  vault: Vault;
}

const Deposit: React.FC<DepositProps> = ({ vault }) => {
  const [approveStatus, approve] = useApprove(vault.token, vault.address);

  // TODO: reactive update of token balance
  const tokenBalance = useTokenBalance(vault.token);
  const sharesBN = useDepositedBalance(vault.contract);
  const shares = getFullBalance(sharesBN);
  const { apy, tvl, pricePerToken, ratio } = useAPY(vault.contract, vault.token.address);
  const apyText = apy ? `${apy.toFixed(2)}%` : '';
  const tvlText = tvl ? `$${tvl.toFixed(0)}` : '';

  const balance = shares * ratio;
  const balanceText = balance.toString().match(/^-?\d+(?:\.\d{0,6})?/)[0];

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
      max={balanceText}
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
            <StyledCardContent>
              <HeaderValue>{apyText}</HeaderValue>
              {!!apy && <Label text="APY (after fees)" />}
            </StyledCardContent>
            <CardIcon>
              <TokenSymbol symbol={vault.token.symbol} size={54} />
            </CardIcon>
            <StyledCardContent>
              <HeaderValue>{tvlText}</HeaderValue>
              {!!tvl && <Label text="TVL" />}
            </StyledCardContent>
          </StyledCardHeader>
          <StyledCardContent>
            <Value value={balanceText} />
            <Label text={`${vault.tokenName} Balance`} />
          </StyledCardContent>
          {pricePerToken && (
            <StyledCardContentValue>
              <Value value={`$${(balance * pricePerToken).toFixed(2)}`} />
              <Label text={`Value`} />
            </StyledCardContentValue>
          )}
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

const HeaderValue = styled.div`
  color: ${(props) => props.theme.color.grey[200]};
  font-size: 28px;
  font-weight: 700;
`;

const StyledCardHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const StyledCardContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const StyledCardContentValue = styled.div`
  margin-top: ${(props) => props.theme.spacing[3]}px;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[3]}px;
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
