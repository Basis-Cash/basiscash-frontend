import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import Page from '../../components/Page';
import Spacer from '../../components/Spacer';
import { HomeCard, HomeCard2, HomeCard3 } from './components/HomeCard';

import micCardBorder from '../../assets/img/mic-card-border.svg';
import misCardBorder from '../../assets/img/mis-card-border.svg';
import {
  MigrationButton, MigrationButton2
} from './components/HomeCard';

import { MigrationCard, MigrationCard2, MigrationClaimButton } from './components/MigrationCard';
import gift from '../../assets/img/gift.png';
import useHarvestFromBoardroom from '../../hooks/useHarvestFromBoardroom';
import useEarningsOnBoardroom from '../../hooks/useEarningsOnBoardroom';

import useTreasuryAllocationTimes from '../../hooks/useTreasuryAllocationTimes';
import moment from 'moment';
import ProgressCountdown from '../Boardroom/components/ProgressCountdown';

const Migration: React.FC = () => {
  const { onReward } = useHarvestFromBoardroom();
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

  return (
    <Page>
      <CardWrapper>
        <HomeCard
          title="MITH Cash (MIC)"
          backgroundImg={micCardBorder}
          headerColor="#4D6756"
          button={<MigrationButton text='SWAP' disabled={false} />}
        />
        <Spacer size="lg" />
        <HomeCard
          title="MITH Shares (MIS)"
          backgroundImg={misCardBorder}
          headerColor="#426687"
          button={<MigrationButton text='SWAP' disabled={false} />}
        />
        <Spacer size="lg" />
        <HomeCard
          title="MIS-USDT LP"
          backgroundImg={misCardBorder}
          headerColor="#426687"
          button={<MigrationButton text='SWAP' disabled={false} />}
        />
        <Spacer size="lg" />
      </CardWrapper>
      <CardWrapper>
        <ShowCards onClick={() => { setMigrationCardShow(!isMigrationCardShow); setMigrationCardShow2(false); }}>
          <HomeCard2
            title="MIC-USDT LP"
            backgroundImg={micCardBorder}
            headerColor="#4D6756"
            button1={<MigrationButton2 text='SWAP Locked with Rewards' disabled={false} />}
            button2={<MigrationButton text='SWAP Unlocked' disabled={false} />}
            clickEvent={isMigrationCardShow}
          />
        </ShowCards>
        <Spacer size="lg" />
        <ShowCards onClick={() => { setMigrationCardShow(false); setMigrationCardShow2(!isMigrationCardShow2); }}>
          <HomeCard3
            title="MIB to MIC V2"
            backgroundImg={micCardBorder}
            headerColor="#4D6756"
            button={<MigrationButton text='SWAP' disabled={false} />}
            clickEvent={isMigrationCardShow2}
          />
        </ShowCards>
        <Spacer size="lg" />
      </CardWrapper>
      {isMigrationCardShow && (
        <StyledRow>
          <MigrationCard day={'1st Pool'} button={<MigrationClaimButton text='Claim MIC' onClick={onReward} disabled={false} width="15%" icon={gift} backgroundColor="#43423F" colorHover="#DBC087" backgroundColorHover="#43423F" color="#DBC087" />} />
          <MigrationCard day={'2nd Pool'} button={<MigrationClaimButton text='Claim MIC' onClick={onReward} disabled={earnedMIC.eq(0)} width="15%" icon={gift} backgroundColor="#43423F" colorHover="#DBC087" backgroundColorHover="#43423F" color="#DBC087" />} />
          <MigrationCard day={'3rd Pool'} button={<MigrationClaimButton text='Claim MIC' onClick={onReward} disabled={earnedMIC.eq(0)} width="15%" icon={gift} backgroundColor="#43423F" colorHover="#DBC087" backgroundColorHover="#43423F" color="#DBC087" />} />
          <MigrationCard day={'4th Pool'} button={<MigrationClaimButton text='Claim MIC' onClick={onReward} disabled={earnedMIC.eq(0)} width="15%" icon={gift} backgroundColor="#43423F" colorHover="#DBC087" backgroundColorHover="#43423F" color="#DBC087" />} />
          <MigrationCard day={'5th Pool'} button={<MigrationClaimButton text='Claim MIC' onClick={onReward} disabled={earnedMIC.eq(0)} width="15%" icon={gift} backgroundColor="#43423F" colorHover="#DBC087" backgroundColorHover="#43423F" color="#DBC087" />} />
          <MigrationCard day={'6th Pool'} button={<MigrationClaimButton text='Claim MIC' onClick={onReward} disabled={earnedMIC.eq(0)} width="15%" icon={gift} backgroundColor="#43423F" colorHover="#DBC087" backgroundColorHover="#43423F" color="#DBC087" />} />
          <MigrationCard day={'7th Pool'} button={<MigrationClaimButton text='Claim MIC' onClick={onReward} disabled={earnedMIC.eq(0)} width="15%" icon={gift} backgroundColor="#43423F" colorHover="#DBC087" backgroundColorHover="#43423F" color="#DBC087" />} />
          <StyledProgressCountdown>
            <ProgressCountdown
              base={prevEpoch}
              deadline={nextEpoch}
              description="Time till next reward unlock"
            />
          </StyledProgressCountdown>
          <StyledNote>
            *Note: You can only use migration tool for swapping MIC-USDT LP once per wallet.
          </StyledNote>
        </StyledRow>
      )}
      {isMigrationCardShow2 && (
        <StyledRow>
          <MigrationCard2 day={'Day 1'} fee={'(50% fee)'} button={<MigrationClaimButton text='Claim MIC' onClick={onReward} disabled={false} width="15%" icon={gift} backgroundColor="#43423F" colorHover="#DBC087" backgroundColorHover="#43423F" color="#DBC087" />} />
          <MigrationCard2 day={'Day 2'} fee={'(40% fee)'} button={<MigrationClaimButton text='Claim MIC' onClick={onReward} disabled={earnedMIC.eq(0)} width="15%" icon={gift} backgroundColor="#43423F" colorHover="#DBC087" backgroundColorHover="#43423F" color="#DBC087" />} />
          <MigrationCard2 day={'Day 3'} fee={'(30% fee)'} button={<MigrationClaimButton text='Claim MIC' onClick={onReward} disabled={earnedMIC.eq(0)} width="15%" icon={gift} backgroundColor="#43423F" colorHover="#DBC087" backgroundColorHover="#43423F" color="#DBC087" />} />
          <MigrationCard2 day={'Day 4'} fee={'(20% fee)'} button={<MigrationClaimButton text='Claim MIC' onClick={onReward} disabled={earnedMIC.eq(0)} width="15%" icon={gift} backgroundColor="#43423F" colorHover="#DBC087" backgroundColorHover="#43423F" color="#DBC087" />} />
          <MigrationCard2 day={'Day 5'} fee={'(10% fee)'} button={<MigrationClaimButton text='Claim MIC' onClick={onReward} disabled={earnedMIC.eq(0)} width="15%" icon={gift} backgroundColor="#43423F" colorHover="#DBC087" backgroundColorHover="#43423F" color="#DBC087" />} />
          <MigrationCard2 day={'>Day 5'} fee={'(0% fee)'} button={<MigrationClaimButton text='Claim MIC' onClick={onReward} disabled={earnedMIC.eq(0)} width="15%" icon={gift} backgroundColor="#43423F" colorHover="#DBC087" backgroundColorHover="#43423F" color="#DBC087" />} />
        </StyledRow>
      )}
    </Page>
  );
};

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
  box-shadow: 0px 0px 20px rgba(219, 192, 135, 0.5), 0px 10px 20px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  width: 85%;
`;

const StyledNote = styled.div`
  font-size: 14px;
  text-algn: center;
  color: ${props => props.theme.color.grey[400]};
  margin: ${(props) => props.theme.spacing[4]}px;;
`

export default Migration;
