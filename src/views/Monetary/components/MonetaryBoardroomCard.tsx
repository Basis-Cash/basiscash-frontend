import React, { useContext, useMemo } from 'react';
import styled, { ThemeContext } from 'styled-components';
import {
  MonetaryCardStakedBalance,
  MonetaryCardEffectiveBalance,
  MonetaryCardButton,
  MonetaryCardFoot,
  MonetaryCardFootCell,
  MonetaryCardHeader,
} from './MonetaryCard';
import boardroom from '../../../assets/img/boardroom.svg';
import { getDisplayBalance } from '../../../utils/formatBalance';
import useEarningsOnBoardroom from '../../../hooks/useEarningsOnBoardroom';
import useStakedBalanceOnBoardroom from '../../../hooks/useStakedBalanceOnBoardroom';
import useHarvestFromBoardroom from '../../../hooks/useHarvestFromBoardroom';
import useEarnings from '../../../hooks/useEarnings';
import useModal from '../../../hooks/useModal';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useBasisCash from '../../../hooks/useBasisCash';
import useStakeToBoardroom from '../../../hooks/useStakeToBoardroom';
import useWithdrawFromBoardroom from '../../../hooks/useWithdrawFromBoardroom';
import WithdrawModal from './WithdrawModal';
import DepositModal from './DepositModal';
import useBoardroomVersion from '../../../hooks/useBoardroomVersion';
import useApprove, { ApprovalState } from '../../../hooks/useApprove';

const MonetaryBoardroomCard: React.FC = () => {
  const { color } = useContext(ThemeContext);
  const { onReward } = useHarvestFromBoardroom();

  const basisCash = useBasisCash();
  const tokenBalance = useTokenBalance(basisCash.BAS);
  const stakedBalance = useStakedBalanceOnBoardroom();
  const earnedMIC = useEarningsOnBoardroom();

  const boardroomVersion = useBoardroomVersion();
  const [approveStatus, approve] = useApprove(
    basisCash.BAS,
    basisCash.boardroomByVersion(boardroomVersion).address,
  );

  const micUSDTEarnings = useEarnings('USDTMICLPTokenSharePool');
  const misUSDTEarnings = useEarnings('USDTMISLPTokenSharePool');
  const earnedMIS = useMemo(
    () => micUSDTEarnings.add(misUSDTEarnings),
    [micUSDTEarnings, misUSDTEarnings]
  );

  const { onStake } = useStakeToBoardroom();
  const { onWithdraw } = useWithdrawFromBoardroom();

  const [onPresentDeposit, onDismissDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      onConfirm={(value) => {
        onStake(value);
        onDismissDeposit();
      }}
      tokenName={'MITH Share'}
    />,
  );

  const [onPresentWithdraw, onDismissWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      onConfirm={(value) => {
        onWithdraw(value);
        onDismissWithdraw();
      }}
      tokenName={'MITH Share'}
    />,
  );

  return (
    <Wrapper color={color.boardroom}>
      <MonetaryCardHeader
        color={color.boardroom}
        icon={boardroom}
        title='Boardroom'
        description='Stakeholders in the boardroom can earn rewards from MIC seigniorage.'
      />
      <MonetaryCardStakedBalance
        title='Staked Balance'
        value={
          stakedBalance
            ? `${getDisplayBalance(stakedBalance)} MIS`
            : '-'
        }
        children={approveStatus !== ApprovalState.APPROVED ? (
          <MonetaryCardButton text='Approve MIS' onClick={approve}/>
        ): (
          <>
            <MonetaryCardButton text='+' size='sm' onClick={onPresentDeposit}/>
            <div style={{width: '8px'}} />
            <MonetaryCardButton text='−' size='sm' onClick={onPresentWithdraw}/>
          </>
        )}
      />
      <MonetaryCardEffectiveBalance
        title='Effective Balance'
        value={
          stakedBalance
            ? `${getDisplayBalance(stakedBalance)} MIS`
            : '-'
        }
      />
      <MonetaryCardFoot>
        <MonetaryCardFootCell
          title='Your total MIC Rewards'
          value={
            earnedMIC
              ? `${getDisplayBalance(earnedMIC)} MIC`
              : '-'
          }
          button={<MonetaryCardButton text='Claim MIC' onClick={onReward} disabled={earnedMIC.eq(0)}/>}
        />
      </MonetaryCardFoot>
    </Wrapper>
  )
};

const Wrapper = styled.div`
  border: 1px solid ${props => props.color};
  color: ${props => props.theme.color.grey[500]};
  background-color: ${props => props.theme.color.oblack};
  border-radius: 20px;
`

export default MonetaryBoardroomCard
