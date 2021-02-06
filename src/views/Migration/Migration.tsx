import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Page from '../../components/Page';
import Spacer from '../../components/Spacer';
import { HomeCard, HomeCard2, HomeCard3 } from './components/HomeCard';

import micCardBorder from '../../assets/img/mic-card-border.svg';
import misCardBorder from '../../assets/img/mis-card-border.svg';
import {
  MigrationButton
} from './components/HomeCard';

const Home: React.FC = () => {
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
        <HomeCard2
          title="MIC-USDT LP"
          backgroundImg={micCardBorder}
          headerColor="#4D6756"
          button1={<MigrationButton text='SWAP Locked with Rewards' disabled={false} />}
          button2={<MigrationButton text='SWAP Unlocked' disabled={false} />}
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
        <HomeCard3
          title="MIB to MIC V2"
          backgroundImg={micCardBorder}
          headerColor="#4D6756"
          button={<MigrationButton text='SWAP' disabled={false} />}
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
