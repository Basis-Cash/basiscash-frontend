import React from 'react';
import styled from 'styled-components';
import Button from '../../../components/Button';
import Card from '../../../components/Card';
import CardContent from '../../../components/CardContent';
import CardIcon from '../../../components/CardIcon';
import IconButton from '../../../components/IconButton';
import { AddIcon, RemoveIcon } from '../../../components/icons';
import Label from '../../../components/Label';
import TokenSymbol from '../../../components/TokenSymbol';
import Value from '../../../components/Value';
import useApprove, { ApprovalState } from '../../../hooks/useApprove';
import useBasisCash from '../../../hooks/useBasisCash';
import useBoardroomVersion from '../../../hooks/useBoardroomVersion';
import useModal from '../../../hooks/useModal';
import useRedeemOnBoardroom from '../../../hooks/useRedeemOnBoardroom';
import useStakedBalanceOnBoardroom from '../../../hooks/useStakedBalanceOnBoardroom';
import useStakeToBoardroom from '../../../hooks/useStakeToBoardroom';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useWithdrawFromBoardroom from '../../../hooks/useWithdrawFromBoardroom';
import { getDisplayBalance } from '../../../utils/formatBalance';
import DepositModal from './DepositModal';
import WithdrawModal from './WithdrawModal';

const Stake: React.FC = () => {
  const basisCash = useBasisCash();
  const boardroomVersion = useBoardroomVersion();
  const [approveStatus, approve] = useApprove(
    basisCash.EBS,
    basisCash.boardroomByVersion(boardroomVersion).address,
  );

  const tokenBalance = useTokenBalance(basisCash.EBS);
  const stakedBalance = useStakedBalanceOnBoardroom();
  const isOldBoardroomMember = boardroomVersion !== 'latest';

  const { onStake } = useStakeToBoardroom();
  const { onWithdraw } = useWithdrawFromBoardroom();
  const { onRedeem } = useRedeemOnBoardroom('Redeem EBS for Boardroom Migration');

  const [onPresentDeposit, onDismissDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      onConfirm={(value) => {
        onStake(value);
        onDismissDeposit();
      }}
      tokenName={'Elastic BTC Share'}
    />,
  );

  const [onPresentWithdraw, onDismissWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      onConfirm={(value) => {
        onWithdraw(value);
        onDismissWithdraw();
      }}
      tokenName={'Elastic BTC Share'}
    />,
  );

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon>
              <TokenSymbol symbol="EBS" />
            </CardIcon>
            <Value value={getDisplayBalance(stakedBalance)} />
            <Label text="Elastic BTC Share Staked" />
          </StyledCardHeader>
          <StyledCardActions>
            {!isOldBoardroomMember && approveStatus !== ApprovalState.APPROVED ? (
              <Button
                disabled={approveStatus !== ApprovalState.NOT_APPROVED}
                onClick={approve}
                text="Approve Elastic BTC Share"
              />
            ) : isOldBoardroomMember ? (
              <>
                <Button onClick={onRedeem} variant="secondary" text="Settle & Withdraw" />
              </>
            ) : (
              <>
                <IconButton onClick={onPresentWithdraw}>
                  <RemoveIcon />
                </IconButton>
                <StyledActionSpacer />
                <IconButton onClick={onPresentDeposit}>
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

export default Stake;
