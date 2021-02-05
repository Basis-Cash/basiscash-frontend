import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import Spacer from '../../components/Spacer';
import HomeCard from './components/HomeCard';
import useBasisCash from '../../hooks/useBasisCash';

import micCardBorder from '../../assets/img/mic-card-border.svg';
import misCardBorder from '../../assets/img/mis-card-border.svg';
import useCashStats from '../../hooks/useCashStats';
import useBondStats from '../../hooks/useBondStats';
import useShareStats from '../../hooks/useShareStats';

const Home: React.FC = () => {
  const basisCash = useBasisCash();
  const cashStat = useCashStats();
  const shareStat = useShareStats();

  const cashAddr = useMemo(() => basisCash?.BAC.address, [basisCash]);
  const shareAddr = useMemo(() => basisCash?.BAS.address, [basisCash]);

  return (
    <Page>
      <PageHeader
        title="Welcome to MITH Cash!"
        subtitle="Buy, sell, and provide liquidity for MITH Cash and MITH Shares on SushiSwap and Curve Stableswap"
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
      </CardWrapper>
    </Page>
  );
};

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

export default Home;
