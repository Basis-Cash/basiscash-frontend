import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useWallet } from 'use-wallet';

import Button from '../../components/Button';
import PageHeader from '../../components/PageHeader';
import Spacer from '../../components/Spacer';
import Harvest from './components/Harvest';
import Stake from './components/Stake';
import { Switch } from 'react-router-dom';
import Page from '../../components/Page';

const Boardroom: React.FC = () => {
  useEffect(() => window.scrollTo(0, 0));
  const { account } = useWallet();
  // TODO: useBoardroom

  return (
    <Switch>
      <Page>
        {!!account ? (
          <>
            <PageHeader
              icon={'🤝'}
              title="Join the Boardroom"
              subtitle="Deposit Basis Shares and earn inflationary rewards"
            />
            <StyledBoardroom>
              <StyledCardsWrapper>
                <StyledCardWrapper>
                  <Harvest />
                </StyledCardWrapper>
                <Spacer />
                <StyledCardWrapper>
                  <Stake />
                </StyledCardWrapper>
              </StyledCardsWrapper>
              <Spacer size="lg" />
              <div>
                <Button onClick={() => {}} text="Settle & Withdraw" />
              </div>
              <Spacer size="lg" />
            </StyledBoardroom>
          </>
        ) : (
          <UnlockWallet />
        )}
      </Page>
    </Switch>
  );
};

const UnlockWallet = () => {
  const { connect } = useWallet();
  return (
    <Center>
      <Button onClick={() => connect('injected')} text="Unlock Wallet" />
    </Center>
  );
};

const StyledBoardroom = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 600px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

const Center = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default Boardroom;
