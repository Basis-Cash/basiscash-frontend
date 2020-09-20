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
import TokenSymbol from '../../../components/TokenSymbol';

interface StakeProps {
  poolContract: Contract;
  tokenContract: ERC20;
  tokenName: string;
  tokenIcon?: string;
}

const Stake: React.FC<StakeProps> = ({ poolContract, tokenContract, tokenName, tokenIcon }) => {
  const [approveStatus, approve] = useApprove(tokenContract, poolContract, tokenName);

  // TODO: reactive update of token balance
  const tokenBalance = useTokenBalance(tokenContract);
  const stakedBalance = useStakedBalance(poolContract);

  const { onStake } = useStake(poolContract, tokenName);
  const { onUnstake } = useUnstake(poolContract, tokenName);

  const [onPresentDeposit] = useModal(
    <DepositModal max={tokenBalance} onConfirm={onStake} tokenName={tokenName} />,
  );

  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={stakedBalance} onConfirm={onUnstake} tokenName={tokenName} />,
  );

  const handleApprove = useCallback(async () => await approve, [approve]);

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon>
              <TokenSymbol symbol={tokenName} size={54} />
            </CardIcon>
            <Value value={getDisplayBalance(stakedBalance, tokenName === 'USDC' ? 6 : 18)} />
            <Label text={`${tokenName} Staked`} />
          </StyledCardHeader>
          <StyledCardActions>
            {approveStatus !== ApprovalState.APPROVED ? (
              <Button
                disabled={approveStatus == ApprovalState.PENDING}
                onClick={handleApprove}
                text={`Approve ${tokenName}`}
              />
            ) : (
              <>
                <IconButton onClick={onPresentWithdraw}>
                  <RemoveIcon />
                </IconButton>
                <StyledActionSpacer />
                {tokenName !== 'YCRV_YAM_UNI_LP' && (
                  <IconButton onClick={onPresentDeposit}>
                    <AddIcon />
                  </IconButton>
                )}
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
