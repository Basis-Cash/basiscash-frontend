import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { UseWalletProvider } from 'use-wallet';

import BanksProvider from './contexts/Banks';
import VaultsProvider from './contexts/Vaults';
import BasisCashProvider from './contexts/BasisCashProvider';
import ModalsProvider from './contexts/Modals';

import Banks from './views/Banks';
import Home from './views/Home';
import Bond from './views/Bond';
import Info from './views/Info';

import store from './state';
import theme from './theme';
import config from './config';
import Updaters from './state/Updaters';
import Boardroom from './views/Boardroom';
import Vaults from './views/Vaults';
import Popups from './components/Popups';

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
          <Route path="/boardroom">
            <Boardroom />
          </Route>
          <Route path="/info">
            <Info />
          </Route>
          <Route path="/vault">
            <Vaults />
          </Route>
        </Switch>
      </Router>
    </Providers>
  );
};

const Providers: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <UseWalletProvider chainId={config.chainId}>
        <Provider store={store}>
          <Updaters />
          <BasisCashProvider>
            <ModalsProvider>
              <BanksProvider>
                <VaultsProvider>
                  <>
                    <Popups />
                    {children}
                  </>
                </VaultsProvider>
              </BanksProvider>
            </ModalsProvider>
          </BasisCashProvider>
        </Provider>
      </UseWalletProvider>
    </ThemeProvider>
  );
};

export default App;
