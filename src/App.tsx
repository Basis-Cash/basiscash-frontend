import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { UseWalletProvider } from 'use-wallet';

import BanksProvider from './contexts/Banks';
import BasisCashProvider from './contexts/BasisCashProvider';
import ModalsProvider from './contexts/Modals';
import YamProvider from './contexts/YamProvider';
import TransactionProvider from './contexts/Transactions';

import Banks from './views/Banks';
import Home from './views/Home';
import Bond from './views/Bond';

import theme from './theme';
import { ChainId } from '@uniswap/sdk';

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
      <UseWalletProvider chainId={ChainId.MAINNET}>
        <BasisCashProvider>
          <YamProvider>
            <TransactionProvider>
              <ModalsProvider>
                <BanksProvider>
                  {children}
                </BanksProvider>
              </ModalsProvider>
            </TransactionProvider>
          </YamProvider>
        </BasisCashProvider>
      </UseWalletProvider>
    </ThemeProvider>
  )
}


export default App
