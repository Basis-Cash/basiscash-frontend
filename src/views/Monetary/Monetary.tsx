import React, { useMemo } from 'react';
import { useWallet } from 'use-wallet';
import { Switch } from 'react-router-dom';
import Page from '../../components/Page';

import Stat from './components/Stat';
import useCashPriceInEstimatedTWAP from '../../hooks/useCashPriceInEstimatedTWAP';
import { getDisplayBalance } from '../../utils/formatBalance';
import useTreasuryAllocationTimes from '../../hooks/useTreasuryAllocationTimes';
import moment from 'moment';
import Phase from './components/Phase';
import Button from '../../components/Button';
import styled from 'styled-components';
import Container from '../../components/Container';
import MonetaryBoardroomCard from './components/MonetaryBoardroomCard';
import { commify } from 'ethers/lib/utils';
import ProgressCountdown from '../Boardroom/components/ProgressCountdown';
import useBondOraclePriceInLastTWAP from '../../hooks/useBondOraclePriceInLastTWAP';

const Monetary: React.FC = () => {
  const { account } = useWallet();

  const cashStat = useCashPriceInEstimatedTWAP();
  const cash1HrPrice = useBondOraclePriceInLastTWAP();

  const scalingFactor = useMemo(
    () => (cashStat ? Number(cashStat.priceInUSDT).toFixed(2) : null),
    [cashStat],
  );
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
    <Switch>
      <Page>
        {!!account ? (
          <Container size='lg'>
            <Phase />
            <StyledStats>
              <ProgressCountdown
                base={prevEpoch}
                deadline={nextEpoch}
                description="Next Epoch"
              />
              {/*<Stat*/}
              {/*  title={cashStat ? `${cashStat.priceInUSDT}` : '-'}*/}
              {/*  description="Expected MIC Received during seigniorage"*/}
              {/*/>*/}
            </StyledStats>
            <StyledStats>
              <Stat
                title={
                  cash1HrPrice
                    ? `$${getDisplayBalance(cash1HrPrice, 18, 3)}`
                    : '-'
                }
                description="1H TWAP MIC Price"
              />
              <Stat
                title={cashStat ? `$${cashStat.priceInUSDT}` : '-'}
                description="24H TWAP Est. MIC Price"
              />
              <Stat
                title={scalingFactor ? `x${scalingFactor}` : '-'}
                description="Scaling Factor"
              />
              <Stat
                title={cashStat ? commify(cashStat.totalSupply) : '-'}
                description="Circulating MIC"
              />
            </StyledStats>
            <StyledMonetary>
              <StyledCardsWrapper>
                <StyledCardWrapper>
                  <MonetaryBoardroomCard />
                </StyledCardWrapper>
              </StyledCardsWrapper>
            </StyledMonetary>
          </Container>
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

const StyledMonetary = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledStats = styled.div`
  display: flex;
  margin-bottom: ${(props) => props.theme.spacing[5]}px;
  margin-left: -${(props) => props.theme.spacing[2]}px;
  margin-right: -${(props) => props.theme.spacing[2]}px;

  > * {
    flex: 1;
    height: 84px;
    margin: 0 ${(props) => props.theme.spacing[2]}px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 75%;
  margin: 0 -${props => props.theme.spacing[2]}px;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: ${props => props.theme.spacing[2]}px;
  min-width: 450px;
`;

const Center = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default Monetary;
