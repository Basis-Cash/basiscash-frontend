import React, { useCallback, useEffect, useState } from 'react';
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

import useAllowance from '../../../hooks/useAllowance';
import useApprove from '../../../hooks/useApprove';
import useModal from '../../../hooks/useModal';
import useStake from '../../../hooks/useStake';
import useStakedBalance from '../../../hooks/useStakedBalance';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useUnstake from '../../../hooks/useUnstake';

import { getDisplayBalance } from '../../../utils/formatBalance';

import DepositModal from './DepositModal';
import WithdrawModal from './WithdrawModal';

interface StakeProps {
  poolContract: Contract;
  tokenContract: Contract;
  tokenName: string;
  tokenIcon?: string;
}

const Stake: React.FC<StakeProps> = ({ poolContract, tokenContract, tokenName, tokenIcon }) => {
  const [requestedApproval, setRequestedApproval] = useState(false);

  const allowance = useAllowance(tokenContract, poolContract);
  const { onApprove } = useApprove(tokenContract, poolContract, tokenName);

  const tokenBalance = useTokenBalance(tokenContract.options.address);
  const stakedBalance = useStakedBalance(poolContract);

  const { onStake } = useStake(poolContract, tokenName);
  const { onUnstake } = useUnstake(poolContract, tokenName);

  const [onPresentDeposit] = useModal(
    <DepositModal max={tokenBalance} onConfirm={onStake} tokenName={tokenName} />,
  );

  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={stakedBalance} onConfirm={onUnstake} tokenName={tokenName} />,
  );

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true);
      const txHash = await onApprove();
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false);
      }
    } catch (e) {
      console.log(e);
    }
  }, [onApprove, setRequestedApproval]);

  const updateApprovalStatus = useCallback(async () => {
    if (allowance.toNumber()) {
      setRequestedApproval(false);
    }
  }, [allowance, setRequestedApproval])

  useEffect(() => {
    if (requestedApproval) {
      const refreshInterval = setInterval(updateApprovalStatus, 5000);
      return () => clearInterval(refreshInterval);
    }
  }, [requestedApproval]);


  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon>{tokenIcon || '🌱'}</CardIcon>
            <Value value={getDisplayBalance(stakedBalance, tokenName === 'USDC' ? 6 : 18)} />
            <Label text={`${tokenName} Staked`} />
          </StyledCardHeader>
          <StyledCardActions>
            {!allowance.toNumber() ? (
              <Button
                disabled={requestedApproval}
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
