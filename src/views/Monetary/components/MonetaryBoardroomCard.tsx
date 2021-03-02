import React, { useContext, useMemo } from 'react';
import styled, { ThemeContext } from 'styled-components';
import {
  MonetaryCardStakedBalance,
  MonetaryCardEffectiveBalance,
  MonetaryCardButton,
  MonetaryClaimAllButton,
  MonetaryClaimButton,
  MonetaryCardFoot,
  MonetaryCardFootCell,
  MonetaryCardHeader,
  MonetaryStakeCard
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
import gift from '../../../assets/img/gift.png';
import useStakedEffectiveBalanceOnBoardroom from '../../../hooks/useStakedEffectiveBalanceOnBoardroom';

const MonetaryBoardroomCard: React.FC = () => {
  const { color } = useContext(ThemeContext);
  const { onReward } = useHarvestFromBoardroom();

  const basisCash = useBasisCash();
  const tokenBalance = useTokenBalance(basisCash.MIS2);
  const stakedBalance = useStakedBalanceOnBoardroom();
  const stakedEffectiveBalance = useStakedEffectiveBalanceOnBoardroom();
  const earnedMIC = useEarningsOnBoardroom();

  const boardroomVersion = useBoardroomVersion();
  const [approveStatus, approve] = useApprove(
    basisCash.MIS2,
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
      tokenName={'MIS2'}
    />,
  );

  const [onPresentWithdraw, onDismissWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      onConfirm={(value) => {
        onWithdraw(value);
        onDismissWithdraw();
      }}
      tokenName={'MIS2'}
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
            ? `${getDisplayBalance(stakedBalance)} MIS2`
            : '-'
        }
        children={approveStatus !== ApprovalState.APPROVED ? (
          <MonetaryCardButton text='Approve MIS2' onClick={approve} />
        ) : (
            <>
              <MonetaryCardButton text='+' size='sm' onClick={onPresentDeposit} />
              <div style={{ width: '8px' }} />
              <MonetaryCardButton text='−' size='sm' onClick={onPresentWithdraw} />
            </>
          )}
      />
      <MonetaryCardEffectiveBalance
        title='Effective Balance (for Epoch)'
        value={
          stakedEffectiveBalance
            ? `${getDisplayBalance(stakedEffectiveBalance)} MIS2`
            : '-'
        }
      />
      <MonetaryCardFoot>
        <MonetaryCardFootCell
          title='Your Total MIC2 Rewards'
          value={
            earnedMIC
              ? `${getDisplayBalance(earnedMIC)} MIC2`
              : '-'
          }
          button={<MonetaryClaimAllButton text='Claim all MIC (subject to fee if within fee period)' onClick={onReward} disabled={earnedMIC.eq(0)} icon={gift} backgroundColor="#43423F" colorHover="#DBC087" backgroundColorHover="#43423F" color="#DBC087" />}
        />
      </MonetaryCardFoot>
      <StyledRow>
        <MonetaryStakeCard day={'Day 1'} fee={'(50% fee)'} epoch={0} />
        <MonetaryStakeCard day={'Day 2'} fee={'(40% fee)'} epoch={1} />
        <MonetaryStakeCard day={'Day 3'} fee={'(30% fee)'} epoch={2} />
        <MonetaryStakeCard day={'Day 4'} fee={'(20% fee)'} epoch={3} />
        <MonetaryStakeCard day={'Day 5'} fee={'(10% fee)'} epoch={4} />
        <MonetaryStakeCard day={'>Day 5'} fee={'(0% fee)'} epoch={5} />
      </StyledRow>
    </Wrapper>
  )
};

const Wrapper = styled.div`
  border: 1px solid ${props => props.color};
  color: ${props => props.theme.color.grey[500]};
  background-color: ${props => props.theme.color.oblack};
  border-radius: 20px;
`

const StyledRow = styled.div`
  display: flex;
  justify-content: center;
  margin-right: -${(props) => props.theme.spacing[4]}px;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
  flex-flow: row wrap;
  width: 100%;
  
  > * {
    margin: 0 ${(props) => props.theme.spacing[4]}px;
  }
  
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: center;
  }
`

export default MonetaryBoardroomCard
