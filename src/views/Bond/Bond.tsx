import React, { useCallback, useMemo } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { useWallet } from 'use-wallet';

import Button from '../../components/Button';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import ExchangeCard from './components/ExchangeCard';
import styled from 'styled-components';
import Spacer from '../../components/Spacer';
import useBondStats from '../../hooks/token/useBondStats';
import useBasisCash from '../../hooks/useBasisCash';
import { useTransactionAdder } from '../../state/transactions/hooks';
import useCashStats from '../../hooks/token/useCashStats';
import config from '../../config';
import LaunchCountdown from '../../components/LaunchCountdown';

const Bond: React.FC = () => {
  const { path } = useRouteMatch();
  const { account, connect } = useWallet();
  const basisCash = useBasisCash();
  const addTransaction = useTransactionAdder();
  const bondStat = useBondStats();
  const cashStat = useCashStats();

  const handleBuyBonds = useCallback(
    async (amount: string) => {
      const tx = await basisCash.buyBonds(amount);
      const bondAmount = Number(amount) / Number(cashStat.priceInDAI);
      addTransaction(tx, {
        summary: `Buy ${bondAmount.toFixed(2)} BAB with ${amount} BAC`,
      });
    },
    [basisCash, addTransaction, cashStat],
  );

  const handleRedeemBonds = useCallback(
    async (amount: string) => {
      const tx = await basisCash.redeemBonds(amount);
      addTransaction(tx, { summary: `Redeem ${amount} BAB` });
    },
    [basisCash, addTransaction],
  );
  const cashIsOverpriced = useMemo(() => Number(cashStat?.priceInDAI) > 1.0, [cashStat]);
  const cashIsUnderPriced = useMemo(() => Number(cashStat?.priceInDAI) < 1.0, [cashStat]);

  const isLaunched = Date.now() >= config.bondLaunchesAt.getTime();
  if (!isLaunched) {
    return (
      <Switch>
        <Page>
          <PageHeader
            icon={'🏦'}
            title="Buy & Redeem Bonds"
            subtitle="Earn premiums upon redemption"
          />
          <LaunchCountdown
            deadline={config.bondLaunchesAt}
            description="How does Basis bonds work?"
            descriptionLink="https://medium.com/basis-cash#TODO"
          />
        </Page>
      </Switch>
    );
  }
  return (
    <Switch>
      <Page>
        {!!account ? (
          <>
            <Route exact path={path}>
              <PageHeader
                icon={'🏦'}
                title="Buy & Redeem Bonds"
                subtitle="Earn premiums upon redemption"
              />
            </Route>
            <StyledBond>
              <StyledCardWrapper>
                <ExchangeCard
                  action="Purchase"
                  fromToken={basisCash.BAC}
                  fromTokenName="Basis Cash"
                  toToken={basisCash.BAB}
                  toTokenName="Basis Bond"
                  priceDesc={`BAB Price: ${!bondStat ? '-' : '$' + bondStat.priceInDAI}`}
                  onExchange={handleBuyBonds}
                  disabled={!bondStat || cashIsOverpriced}
                />
              </StyledCardWrapper>
              <Spacer size="lg" />
              <StyledCardWrapper>
                <ExchangeCard
                  action="Redeem"
                  fromToken={basisCash.BAB}
                  fromTokenName="Basis Bond"
                  toToken={basisCash.BAC}
                  toTokenName="Basis Cash"
                  priceDesc="1 BAB = 1 BAC"
                  onExchange={handleRedeemBonds}
                  disabled={!bondStat || cashIsUnderPriced}
                />
              </StyledCardWrapper>
            </StyledBond>
          </>
        ) : (
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <Button onClick={() => connect('injected')} text="Unlock Wallet" />
          </div>
        )}
      </Page>
    </Switch>
  );
};

const StyledBond = styled.div`
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

export default Bond;
