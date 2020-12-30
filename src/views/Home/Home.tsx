import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import Spacer from '../../components/Spacer';
import HomeCard from './components/HomeCard';
import { OverviewData } from './types';
import useBasisCash from '../../hooks/useBasisCash';
import config from '../../config';

import micCardBorder from '../../assets/img/mic-card-border.svg';
import misCardBorder from '../../assets/img/mis-card-border.svg';
import mibCardBorder from '../../assets/img/mib-card-border.svg';
import useCashStats from '../../hooks/useCashStats';
import useBondStats from '../../hooks/useBondStats';
import useShareStats from '../../hooks/useShareStats';

const Home: React.FC = () => {
  const basisCash = useBasisCash();
  const cashStat = useCashStats();
  const bondStat = useBondStats();
  const shareStat = useShareStats();

  const cashAddr = useMemo(() => basisCash?.BAC.address, [basisCash]);
  const shareAddr = useMemo(() => basisCash?.BAS.address, [basisCash]);
  const bondAddr = useMemo(() => basisCash?.BAB.address, [basisCash]);

  return (
    <Page>
      <PageHeader
        title="Welcome to MITH Cash!"
        subtitle="Buy, sell, and provide liquidity for MITH Cash and MITH Shares on SushiSwap"
      />
      <Spacer size="md" />
      <CardWrapper>
        <HomeCard
          title="MITH Cash"
          backgroundImg={micCardBorder}
          headerColor="#4D6756"
          supplyLabel="Circulating Supply"
          address={cashAddr}
          stat={cashStat}
        />
        <Spacer size="lg" />
        <HomeCard
          title="MITH Share"
          backgroundImg={misCardBorder}
          headerColor="#426687"
          address={shareAddr}
          stat={shareStat}
        />
        <Spacer size="lg" />
        <HomeCard
          title="MITH Bond"
          backgroundImg={mibCardBorder}
          headerColor="#6D55A1"
          address={bondAddr}
          stat={bondStat}
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
  max-width: 768px;
  width: 90vw;
`;

const StyledSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`;

const StyledLink = styled.a`
  font-weight: 700;
  text-decoration: none;
  color: ${(props) => props.theme.color.primary.main};
`;

export default Home;
