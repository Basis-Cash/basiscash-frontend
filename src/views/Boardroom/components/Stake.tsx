import React, { useCallback } from 'react';
import styled from 'styled-components';

import { Contract } from 'ethers';

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
import useStake from '../../../hooks/useStake';
import useStakedBalance from '../../../hooks/useStakedBalance';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useUnstake from '../../../hooks/useUnstake';

import { getDisplayBalance } from '../../../utils/formatBalance';

import DepositModal from './DepositModal';
import WithdrawModal from './WithdrawModal';
import ERC20 from '../../../basis-cash/ERC20';
import useBasisCash from '../../../hooks/useBasisCash';
import useStakedBalanceOnBoardroom from '../../../hooks/useStakedBalanceOnBoardroom';
import TokenSymbol from '../../../components/TokenSymbol';

interface StakeProps {
  // poolContract: Contract;
  // tokenContract: ERC20;
  // tokenName: string;
  // tokenIcon?: string;
}

const Stake: React.FC<StakeProps> = ({ }) => {
  const { BAS, contracts: { Boardroom } } = useBasisCash();
  const [approveStatus, approve] = useApprove(BAS, Boardroom, 'BAS');

  // TODO: reactive update of token balance
  const tokenBalance = useTokenBalance(BAS);
  const stakedBalance = useStakedBalanceOnBoardroom();

  // const { onStake } = useStake(poolContract, tokenName);
  // const { onUnstake } = useUnstake(poolContract, tokenName);
  const onStake = () => {};
  const onUnstake = () => {};

  const [onPresentDeposit] = useModal(
    <DepositModal max={tokenBalance} onConfirm={onStake} tokenName={"Basis Share"} />,
  );

  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={stakedBalance} onConfirm={onUnstake} tokenName={"Basis Share"} />,
  );

  const handleApprove = useCallback(async () => await approve, [approve]);

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon>
              <TokenSymbol symbol="BAS" />
            </CardIcon>
            <Value value={getDisplayBalance(stakedBalance)} />
            <Label text="Basis Share Staked" />
          </StyledCardHeader>
          <StyledCardActions>
            {approveStatus !== ApprovalState.APPROVED ? (
              <Button
                disabled={approveStatus == ApprovalState.PENDING}
                onClick={handleApprove}
                text="Approve Basis Share"
              />
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
