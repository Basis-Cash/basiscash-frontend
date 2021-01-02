import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import Spacer from '../../components/Spacer';
import HomeCard from './components/HomeCard';
import { OverviewData } from './types';
import useBasisCash from '../../hooks/useBasisCash';
import config from '../../config';
import Notice from '../../components/Notice';

const Home: React.FC = () => {
  const basisCash = useBasisCash();

  const [{ cash, bond, share }, setStats] = useState<OverviewData>({});
  const fetchStats = useCallback(async () => {
    const [cash, bond, share] = await Promise.all([
      basisCash.getCashStatFromUniswap(),
      basisCash.getBondStat(),
      basisCash.getShareStat(),
    ]);
    if (Date.now() < config.bondLaunchesAt.getTime()) {
      bond.priceInDAI = '-';
    }
    setStats({ cash, bond, share });
  }, [basisCash, setStats]);

  useEffect(() => {
    if (basisCash) {
      fetchStats()
        .catch(err => console.error(err.stack));
    }
  }, [basisCash]);

  const cashAddr = useMemo(() => basisCash?.BAC.address, [basisCash]);
  const shareAddr = useMemo(() => basisCash?.BAS.address, [basisCash]);
  const bondAddr = useMemo(() => basisCash?.BAB.address, [basisCash]);

  //make time for aus
  const dateToTime = (date: Date) => date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric'
});

const dateString = "2020-12-11T00:00:00Z";
const userOffset = new Date().getTimezoneOffset()*60*1000;
const localDate = new Date(dateString);
const utcDate = new Date(localDate.getTime() + userOffset);

 console.log(`${dateToTime(utcDate)} (${dateToTime(localDate)} Your Time)`);

  return (
    <Page>
      <PageHeader
        icon="👋"
        subtitle="Buy, sell, and provide liquidity for JAM (Cash) and JAZZ (Shares) on Uniswap"
        title="Welcome to JAM Cash!"
      />
      <StyledNoticeContainer>
        <Notice>
          Boardroom Seigniorage starts at <b>JAMUARY 11 (Fri) 12:00am UTC</b>.
         
         <b></b>.

         <h3>TimeZones</h3>
         
         UTC Date: Friday {dateToTime(utcDate)} 
         <br></br>
         
         Local Date: Friday {dateToTime(localDate)}

         
        </Notice>
      </StyledNoticeContainer>
      <Spacer size="md" />
      <CardWrapper>
        <HomeCard
          title={'JAM Cash'}
          symbol="JAM"
          color="#EEA7ED"
          address={cashAddr}
          stat={cash}
        />
        <Spacer size="lg" />
        <HomeCard
          title={'JAM JAZZ (Share)'}
          symbol="JAZZ"
          color="#E83725"
          address={shareAddr}
          stat={share}
        />
        <Spacer size="lg" />
        <HomeCard
          title={'JAM JAB'}
          symbol="JAB"
          color="#ECF25C"
          address={bondAddr}
          stat={bond}
        />
      </CardWrapper>
    </Page>
  );
};

const StyledOverview = styled.div`
  align-items: center;
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
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

const StyledNoticeContainer = styled.div`
  width: 768px;
`;

const StyledSpacer = styled.div`
  height: ${props => props.theme.spacing[4]}px;
  width: ${props => props.theme.spacing[4]}px;
`;

const StyledLink = styled.a`
  font-weight: 700;
  text-decoration: none;
  color: ${props => props.theme.color.primary.main};
`;

export default Home;
