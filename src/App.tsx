import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { UseWalletProvider } from 'use-wallet';

import BanksProvider from './contexts/Banks';
import BasisCashProvider from './contexts/BasisCashProvider';
import ModalsProvider from './contexts/Modals';
import TransactionProvider from './contexts/Transactions';

import Banks from './views/Banks';
import Home from './views/Home';
import Bond from './views/Bond';

import theme from './theme';
import config from './config';

const App: React.FC = () => {
  return (
    <Providers>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/bank">
            <Banks />
          </Route>
          <Route path="/bonds">
            <Bond />
          </Route>
        </Switch>
      </Router>
    </Providers>
  )
}

const Providers: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <UseWalletProvider chainId={config.chainId}>
        <BasisCashProvider>
          <TransactionProvider>
            <ModalsProvider>
              <BanksProvider>
                {children}
              </BanksProvider>
            </ModalsProvider>
          </TransactionProvider>
        </BasisCashProvider>
      </UseWalletProvider>
    </ThemeProvider>
  )
}


export default App
