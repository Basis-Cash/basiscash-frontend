import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import Page from '../../components/Page';
import Spacer from '../../components/Spacer';
import { HomeCard, HomeCard2, MigrationButton, MigrationButton2 } from './components/HomeCard';

import micCardBorder from '../../assets/img/mic-card-border.svg';
import misCardBorder from '../../assets/img/mis-card-border.svg';

import { MigrationCard, MigrationCard2, MigrationClaimButton } from './components/MigrationCard';
import gift from '../../assets/img/gift.png';
import useHarvestFromBoardroom from '../../hooks/useHarvestFromBoardroom';
import useEarningsOnBoardroom from '../../hooks/useEarningsOnBoardroom';

import useTreasuryAllocationTimes from '../../hooks/useTreasuryAllocationTimes';
import moment from 'moment';
import ProgressCountdown from '../Boardroom/components/ProgressCountdown';
import lock from '../../assets/img/lock.png';
import unlock from '../../assets/img/unlock.png';
import useBasisCash from '../../hooks/useBasisCash';
import useApprove, { ApprovalState } from '../../hooks/useApprove';
import { useWallet } from 'use-wallet';
import { Switch } from 'react-router-dom';
import Button from '../../components/Button';

const Migration: React.FC = () => {
  const { onReward } = useHarvestFromBoardroom();
  const { account, connect } = useWallet();

  const earnedMIC = useEarningsOnBoardroom();
  const [isMigrationCardShow, setMigrationCardShow] = useState(false);
  const [isMigrationCardShow2, setMigrationCardShow2] = useState(false);

  const { prevAllocation, nextAllocation } = useTreasuryAllocationTimes();
  const prevEpoch = useMemo(
    () =>
      nextAllocation.getTime() <= Date.now()
        ? moment().utc().startOf('day').toDate()
        : prevAllocation,
    [prevAllocation, nextAllocation],
  );
  const nextEpoch = useMemo(() => moment(prevEpoch).add(6, 'hours').toDate(), [prevEpoch]);
  const basisCash = useBasisCash();

  const [micApproveStatus, micApprove] = useApprove(basisCash.BAC, basisCash.contracts['MICV1Migrate'].address);
  const [misApproveStatus, misApprove] = useApprove(basisCash.BAS, basisCash.contracts['MISV1Migrate'].address);
  const [micUsdtApproveStatus, micUsdtApprove] = useApprove(basisCash.externalTokens['MIC_USDT-SUSHI-LPv2'], basisCash.contracts['MICUSDTV1Migrate'].address);
  const [misUsdtApproveStatus, misUsdtApprove] = useApprove(basisCash.externalTokens['MIS_USDT-SUSHI-LPv2'], basisCash.contracts['MISUSDTV1Migrate'].address);

  return !account ? (
    <Page>
      <Center>
        <Button onClick={() => connect('injected')} text="Unlock Wallet" />
      </Center>
    </Page>
  ) : (
    <Page>
      <CardWrapper>
        <HomeCard
          title="MITH Cash (MIC)"
          backgroundImg={micCardBorder}
          headerColor="#4D6756"
          button={micApproveStatus === ApprovalState.APPROVED ? (
            <MigrationButton text='SWAP' disabled={false} onClick={() => {basisCash.migrateMicV1ToV2()}} />
            ) : (
            <MigrationButton text='APPROVE' disabled={false} onClick={micApprove} />
          )}
          contractName="MICV1Migrate"
          from={basisCash.BAC}
          to={basisCash.MIC2}
        />
        <Spacer size="lg" />
        <HomeCard
          title="MITH Shares (MIS)"
          backgroundImg={misCardBorder}
          headerColor="#426687"
          button={misApproveStatus === ApprovalState.APPROVED ? (
            <MigrationButton text='SWAP' disabled={false} onClick={() => {basisCash.migrateMisV1ToV2()}} />
          ) : (
            <MigrationButton text='APPROVE' disabled={false} onClick={misApprove} />
          )}
          contractName="MISV1Migrate"
          from={basisCash.BAS}
          to={basisCash.MIS2}
        />
        <Spacer size="lg" />
        <HomeCard
          title="MIS-USDT LP"
          backgroundImg={misCardBorder}
          headerColor="#426687"
          button={misUsdtApproveStatus === ApprovalState.APPROVED ? (
            <MigrationButton text='SWAP' disabled={false} onClick={() => {basisCash.migrateMisUsdtV1ToV2()}} />
          ) : (
            <MigrationButton text='APPROVE' disabled={false} onClick={misUsdtApprove} />
          )}
          contractName="MISUSDTV1Migrate"
          from={basisCash.externalTokens['MIS_USDT-SUSHI-LPv2']}
          to={basisCash.externalTokens['MIS2_USDT-SUSHI-LPv2']}
        />
        <Spacer size="lg" />
      </CardWrapper>
      {/*<CardWrapper>*/}
      {/*  <ShowCards onClick={() => {}}>*/}
      {/*    {micUsdtApproveStatus === ApprovalState.APPROVED ? (*/}
      {/*      <HomeCard2*/}
      {/*        title="MIC-USDT LP"*/}
      {/*        backgroundImg={micCardBorder}*/}
      {/*        headerColor="#4D6756"*/}
      {/*        button1={<MigrationButton2 text='SWAP Locked with Rewards'*/}
      {/*                                   disabled={false}*/}
      {/*                                   icon={lock}*/}
      {/*                                   onClick={() => {basisCash.migrateMicUsdtV1ToV2(true)}}/>}*/}
      {/*        button2={<MigrationButton text='SWAP Unlocked'*/}
      {/*                                  disabled={false}*/}
      {/*                                  icon={unlock}*/}
      {/*                                  onClick={() => {basisCash.migrateMicUsdtV1ToV2(false)}}/>}*/}
      {/*        clickEvent={isMigrationCardShow}*/}
      {/*        contractName="MICUSDTV1Migrate"*/}
      {/*        from={basisCash.externalTokens['MIC_USDT-SUSHI-LPv2']}*/}
      {/*        to={basisCash.externalTokens['MICv2_3CRV']}*/}
      {/*      />*/}
      {/*    ) : (*/}
      {/*      <HomeCard*/}
      {/*        title="MIC-USDT LP"*/}
      {/*        backgroundImg={micCardBorder}*/}
      {/*        headerColor="#4D6756"*/}
      {/*        button={<MigrationButton text='APPROVE' disabled={false} onClick={micUsdtApprove} />}*/}
      {/*        contractName="MICUSDTV1Migrate"*/}
      {/*        from={basisCash.externalTokens['MIC_USDT-SUSHI-LPv2']}*/}
      {/*        to={basisCash.externalTokens['MICv2_3CRV']}*/}
      {/*      />*/}
      {/*    )}*/}
      {/*  </ShowCards>*/}
      {/*  /!*<Spacer size="lg" />*!/*/}
      {/*  /!*<ShowCards onClick={() => { setMigrationCardShow(false); setMigrationCardShow2(!isMigrationCardShow2); }}>*!/*/}
      {/*  /!*  <HomeCard3*!/*/}
      {/*  /!*    title="MIB to MIC V2"*!/*/}
      {/*  /!*    backgroundImg={micCardBorder}*!/*/}
      {/*  /!*    headerColor="#4D6756"*!/*/}
      {/*  /!*    button={<MigrationButton text='SWAP' disabled={false} />}*!/*/}
      {/*  /!*    clickEvent={isMigrationCardShow2}*!/*/}
      {/*  /!*  />*!/*/}
      {/*  /!*</ShowCards>*!/*/}
      {/*  /!*<Spacer size="lg" />*!/*/}
      {/*</CardWrapper>*/}

      {/*{isMigrationCardShow && (*/}
      {/*  <StyledRow>*/}
      {/*    <MigrationCard day={'1st Pool'} button={<MigrationClaimButton text='Claim MIC' onClick={onReward} disabled={false} width="15%" icon={gift} backgroundColor="#43423F" colorHover="#DBC087" backgroundColorHover="#43423F" color="#DBC087" />} />*/}
      {/*    <MigrationCard day={'2nd Pool'} button={<MigrationClaimButton text='Claim MIC' onClick={onReward} disabled={earnedMIC.eq(0)} width="15%" icon={gift} backgroundColor="#43423F" colorHover="#DBC087" backgroundColorHover="#43423F" color="#DBC087" />} />*/}
      {/*    <MigrationCard day={'3rd Pool'} button={<MigrationClaimButton text='Claim MIC' onClick={onReward} disabled={earnedMIC.eq(0)} width="15%" icon={gift} backgroundColor="#43423F" colorHover="#DBC087" backgroundColorHover="#43423F" color="#DBC087" />} />*/}
      {/*    <MigrationCard day={'4th Pool'} button={<MigrationClaimButton text='Claim MIC' onClick={onReward} disabled={earnedMIC.eq(0)} width="15%" icon={gift} backgroundColor="#43423F" colorHover="#DBC087" backgroundColorHover="#43423F" color="#DBC087" />} />*/}
      {/*    <MigrationCard day={'5th Pool'} button={<MigrationClaimButton text='Claim MIC' onClick={onReward} disabled={earnedMIC.eq(0)} width="15%" icon={gift} backgroundColor="#43423F" colorHover="#DBC087" backgroundColorHover="#43423F" color="#DBC087" />} />*/}
      {/*    <MigrationCard day={'6th Pool'} button={<MigrationClaimButton text='Claim MIC' onClick={onReward} disabled={earnedMIC.eq(0)} width="15%" icon={gift} backgroundColor="#43423F" colorHover="#DBC087" backgroundColorHover="#43423F" color="#DBC087" />} />*/}
      {/*    <MigrationCard day={'7th Pool'} button={<MigrationClaimButton text='Claim MIC' onClick={onReward} disabled={earnedMIC.eq(0)} width="15%" icon={gift} backgroundColor="#43423F" colorHover="#DBC087" backgroundColorHover="#43423F" color="#DBC087" />} />*/}
      {/*    <StyledProgressCountdown>*/}
      {/*      <ProgressCountdown*/}
      {/*        base={prevEpoch}*/}
      {/*        deadline={nextEpoch}*/}
      {/*        description="Time till next reward unlock"*/}
      {/*      />*/}
      {/*    </StyledProgressCountdown>*/}
      {/*    <StyledNote>*/}
      {/*      *Note: You can only use migration tool for swapping MIC-USDT LP once per wallet.*/}
      {/*    </StyledNote>*/}
      {/*  </StyledRow>*/}
      {/*)}*/}
      {/*{isMigrationCardShow2 && (*/}
      {/*  <StyledRow>*/}
      {/*    <MigrationCard2 day={'Day 1'} fee={'(50% fee)'} button={<MigrationClaimButton text='Claim MIC' onClick={onReward} disabled={false} width="15%" icon={gift} backgroundColor="#43423F" colorHover="#DBC087" backgroundColorHover="#43423F" color="#DBC087" />} />*/}
      {/*    <MigrationCard2 day={'Day 2'} fee={'(40% fee)'} button={<MigrationClaimButton text='Claim MIC' onClick={onReward} disabled={earnedMIC.eq(0)} width="15%" icon={gift} backgroundColor="#43423F" colorHover="#DBC087" backgroundColorHover="#43423F" color="#DBC087" />} />*/}
      {/*    <MigrationCard2 day={'Day 3'} fee={'(30% fee)'} button={<MigrationClaimButton text='Claim MIC' onClick={onReward} disabled={earnedMIC.eq(0)} width="15%" icon={gift} backgroundColor="#43423F" colorHover="#DBC087" backgroundColorHover="#43423F" color="#DBC087" />} />*/}
      {/*    <MigrationCard2 day={'Day 4'} fee={'(20% fee)'} button={<MigrationClaimButton text='Claim MIC' onClick={onReward} disabled={earnedMIC.eq(0)} width="15%" icon={gift} backgroundColor="#43423F" colorHover="#DBC087" backgroundColorHover="#43423F" color="#DBC087" />} />*/}
      {/*    <MigrationCard2 day={'Day 5'} fee={'(10% fee)'} button={<MigrationClaimButton text='Claim MIC' onClick={onReward} disabled={earnedMIC.eq(0)} width="15%" icon={gift} backgroundColor="#43423F" colorHover="#DBC087" backgroundColorHover="#43423F" color="#DBC087" />} />*/}
      {/*    <MigrationCard2 day={'>Day 5'} fee={'(0% fee)'} button={<MigrationClaimButton text='Claim MIC' onClick={onReward} disabled={earnedMIC.eq(0)} width="15%" icon={gift} backgroundColor="#43423F" colorHover="#DBC087" backgroundColorHover="#43423F" color="#DBC087" />} />*/}
      {/*  </StyledRow>*/}
      {/*)}*/}
    </Page>
  );
};

const Center = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const ShowCards = styled.div`
  margin-top: ${(props) => props.theme.spacing[4]}px;
`;

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledRow = styled.div`
  border: 1px solid ${props => props.theme.color.gold};
  background-color: ${props => props.theme.color.oblack};
  border-radius: 20px;
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
  margin-top: ${(props) => props.theme.spacing[4]}px;
  padding: 35px 0;
  
  > * {
    margin: 0 ${(props) => props.theme.spacing[4]}px;
  }
  
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: center;
  }
  width: 1350px;
`

const StyledProgressCountdown = styled.div`
  position: relative;
  margin-top: ${props => props.theme.spacing[3]}px;
  padding: ${(props) => props.theme.spacing[2]}px ${(props) => props.theme.spacing[4]}px;
  background: #26272D;
  border: 2px solid #DBC087;
  box-sizing: border-box;
  box-shadow: inset 0px 0px 13px rgba(248, 217, 117, 0.5);
  border-radius: 20px;
  width: 100%;
`;

const StyledNote = styled.div`
  font-size: 14px;
  text-algn: center;
  color: ${props => props.theme.color.grey[400]};
  margin: ${(props) => props.theme.spacing[4]}px;;
`

export default Migration;
