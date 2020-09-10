import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { useWallet } from 'use-wallet';
import Button from '../../components/Button';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import Bank from '../Bank';
import BankCards from './BankCards';

const Banks: React.FC = () => {
  const { path } = useRouteMatch();
  const { account, connect } = useWallet();
  return (
    <Switch>
      <Page>
        {!!account ? (
          <>
            <Route exact path={path}>
              <PageHeader
                icon={'🏦'}
                title="Pick a Bank."
                subtitle="Earn Basis Cash / Basis Shares by providing liquidity"
              />
              <BankCards />
            </Route>
            <Route path={`${path}/:bankId`}>
              <Bank />
            </Route>
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

export default Banks;
