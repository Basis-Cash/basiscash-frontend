import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import Spacer from '../../components/Spacer';
import HomeCard from './components/HomeCard';
import { OverviewData } from './types';
import useBasisCash from '../../hooks/useBasisCash';

const Home: React.FC = () => {
  const basisCash = useBasisCash();

  const [{ cash, bond, share }, setStats] = useState<OverviewData>({});
  const fetchStats = useCallback(async () => {
    const [cash, bond, share] = await Promise.all([
      basisCash.getCashStat(),
      basisCash.getBondStat(),
      basisCash.getShareStat(),
    ]);
    setStats({ cash, bond, share });
  }, [basisCash, setStats]);

  useEffect(() => {
    if (basisCash) {
      fetchStats()
        .catch(err => console.error(err.stack));
    }
  }, [basisCash]);

  return (
    <Page>
      <PageHeader
        icon="👋"
        subtitle="Buy, sell, and provide liquidity for Basis Cash and Basis Shares on Uniswap"
        title="Welcome to Basis Cash!"
      />
      <Spacer />
      <CardWrapper>
        <HomeCard
          title={'Basis Cash'}
          symbol="BAC"
          color="#EEA7ED"
          stat={cash}
        />
        <Spacer size="lg" />
        <HomeCard
          title={'Basis Share'}
          symbol="BAS"
          color="#E83725"
          stat={share}
        />
        <Spacer size="lg" />
        <HomeCard
          title={'Basis Bonds'}
          symbol="BAB"
          color="#ECF25C"
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