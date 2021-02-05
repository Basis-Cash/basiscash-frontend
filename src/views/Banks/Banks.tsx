import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Page from '../../components/Page';
import Bank from '../Bank';
import BankCards from './BankCards';
import { useWallet } from 'use-wallet';
import Button from '../../components/Button';
import styled from 'styled-components';
import mis from '../../assets/img/mis-logo.svg';

const Banks: React.FC = () => {
  const { path } = useRouteMatch();
  const { account, connect } = useWallet();

  return (
    <Switch>
      <Page>
        <Route exact path={path}>
          {!!account ? (
            <>
              <Header>
                <WhiteSpan>Earn</WhiteSpan>
                <HeaderImg src={mis}/>
                <BlueSpan>MIS</BlueSpan>
              </Header>
              <BankCards />
            </>
          ) : (
            <Center>
              <Button onClick={() => connect('injected')} text="Unlock Wallet" />
            </Center>
          )}
        </Route>
        <Route path={`${path}/:bankId`}>
          <Bank />
        </Route>
      </Page>
    </Switch>
  );
};

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing[4]}px;
`

const HeaderImg = styled.img`
  margin: 0 ${props => props.theme.spacing[2]}px;
`

const Center = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const WhiteSpan = styled.span`
  color: ${props => props.theme.color.white};
  font-size: 32px;
`

const BlueSpan = styled.span`
  color: #8DB5DA;
  font-size: 32px;
`

export default Banks;
