import React, { useContext, useMemo } from 'react';
import styled, { ThemeContext } from 'styled-components';
import {
  MonetaryCardBody,
  MonetaryCardButton,
  MonetaryCardFoot,
  MonetaryCardFootCell,
  MonetaryCardHeader,
} from './MonetaryCard';
import mis from '../../../assets/img/mis-logo.svg';
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

const MonetaryBoardroomCard: React.FC = () => {
  const { color } = useContext(ThemeContext);
  const { onReward } = useHarvestFromBoardroom();

  const basisCash = useBasisCash();
  const tokenBalance = useTokenBalance(basisCash.BAS);
  const stakedBalance = useStakedBalanceOnBoardroom();
  const earnedMIC = useEarningsOnBoardroom();

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
        icon={mis}
        title='Boardroom'
        description='Stakeholders in the boardroom can earn rewards from MIC seigniorage.'
      />
      <MonetaryCardBody
        title='Staked Balance'
        value={
          stakedBalance
            ? `${getDisplayBalance(stakedBalance)} MIS`
            : '-'
        }
        children={
          <>
            <MonetaryCardButton text='+' size='sm' onClick={onPresentDeposit}/>
            <div style={{width: '8px'}} />
            <MonetaryCardButton text='−' size='sm' onClick={onPresentWithdraw}/>
          </>
        }
      />
      <MonetaryCardFoot>
        <MonetaryCardFootCell
          title='Your MIC Rewards'
          value={
            earnedMIC
              ? `${getDisplayBalance(earnedMIC)} MIC`
              : '-'
          }
          button={<MonetaryCardButton text='Claim MIC' onClick={onReward} disabled={earnedMIC.eq(0)}/>}
        />
        <MonetaryCardFootCell
          title='Your MIS Rewards'
          value={getDisplayBalance(earnedMIS)}
          button={<MonetaryCardButton text='Claim MIS' to='/bank/' disabled={earnedMIS.eq(0)}/>}
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
