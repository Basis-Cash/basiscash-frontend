import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import Vault from '../Vault';
import VaultCards from './VaultCards';
import { useWallet } from 'use-wallet';
import Button from '../../components/Button';
import styled from 'styled-components';

const Vaults: React.FC = () => {
  const { path } = useRouteMatch();
  const { account, connect } = useWallet();

  return (
    <Switch>
      <Page>
        <StyledDisclaimer>
          These vaults have been developed by the MITH Cash Community, and are not part of the
          MITH Cash core protocol. Please use them at your own risk. Community Vaults are MITH
          Cash's in-house solution for all your auto-compounding needs! Pay a lower fee than
          anywhere else, and as a bonus, contribute to the growth of the MITH Cash ecosystem.
          <AuditsArea>
            Check the Audits here.{' '}
            <a href="/artl-dev-protocol_simple_audit_20200201.pdf" target="_blank">
              Steaker Audit
            </a>{' '}
          </AuditsArea>
        </StyledDisclaimer>
        <Route exact path={path}>
          <PageHeader
            title="Pick a Vault (v1)"
            subtitle="Auto-compound your yields by depositing your LP tokens in a Community Vault"
          />
          {!!account ? (
            <VaultCards />
          ) : (
            <Center>
              <Button onClick={() => connect('injected')} text="Unlock Wallet" />
            </Center>
          )}
        </Route>
        <Route path={`${path}/:vaultId`}>
          <Vault />
        </Route>
        <StyledTitle>VAULT COMPARISON</StyledTitle>
        <ComparisonTable>
          <ComparisonHeader>
            <ComparisonHeaderItem>MITH Cash Community Vault</ComparisonHeaderItem>
            <ComparisonHeaderItem>Harvest Finance</ComparisonHeaderItem>
            <ComparisonHeaderItem>Pickle Finance</ComparisonHeaderItem>
          </ComparisonHeader>
          <ComparisonBody>
            <ComparisonBodyCategory>
              <ComparisonBodyCategoryItem>Profit Fees</ComparisonBodyCategoryItem>
              <ComparisonBodyCategoryItem>Strategy</ComparisonBodyCategoryItem>
              <ComparisonBodyCategoryItem>Audit Status</ComparisonBodyCategoryItem>
              <ComparisonBodyCategoryItem>
                Benefits to MITH Ecosystem
              </ComparisonBodyCategoryItem>
            </ComparisonBodyCategory>
            <ComparisonBodyMain>
              <ComparisonBodyMainItem>15%</ComparisonBodyMainItem>
              <ComparisonBodyMainItem>30%</ComparisonBodyMainItem>
              <ComparisonBodyMainItem>20%</ComparisonBodyMainItem>
              <ComparisonBodyMainItem>
                Auto-compounding Farmed MIS is sold for more MIC-USDT LP
              </ComparisonBodyMainItem>
              <ComparisonBodyMainItem>
                Auto-Harvesting Farmed MIS is sold for FARM tokens
              </ComparisonBodyMainItem>
              <ComparisonBodyMainItem>
                Auto-compounding Farmed MIS is sold for more MIC-USDT LP
              </ComparisonBodyMainItem>
              <ComparisonBodyMainItem>
                Steaker Audit Passed DefiYield in progress Vault is a fork of the Picklejar
                0.99g
              </ComparisonBodyMainItem>
              <ComparisonBodyMainItem>Yes</ComparisonBodyMainItem>
              <ComparisonBodyMainItem>Yes</ComparisonBodyMainItem>
              <ComparisonBodyMainItem>
                Vault profits are channeled back to the MITH Development Fund
              </ComparisonBodyMainItem>
              <ComparisonBodyMainItem>None. Dumping MIS for FARM</ComparisonBodyMainItem>
              <ComparisonBodyMainItem>
                Marginal. Limited buying pressure on MIC is outweighed by MIS dumping
              </ComparisonBodyMainItem>
            </ComparisonBodyMain>
          </ComparisonBody>
        </ComparisonTable>
      </Page>
    </Switch>
  );
};

const Center = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const StyledDisclaimer = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
  width: 800px;
  background: rgba(219, 192, 135, 0.3);
  color: white;
  padding: ${(props) => `${props.theme.spacing[2]}px ${props.theme.spacing[3]}px`};
  margin-top: ${(props) => `${props.theme.spacing[3]}px`};
  margin-bottom: ${(props) => `${props.theme.spacing[3]}px`};
  border-radius: 10px;
`;

const ComparisonTable = styled.div`
  width: 850px;
  color: ${(props) => props.theme.color.gold};
  margin-bottom: ${(props) => `${props.theme.spacing[6]}px`};
`;

const ComparisonHeader = styled.div`
  display: flex;
  background: #3a3a3a;
  padding-left: 25%;
  padding-top: ${(props) => `${props.theme.spacing[2]}px`};
  padding-bottom: ${(props) => `${props.theme.spacing[2]}px`};
  margin-bottom: ${(props) => `${props.theme.spacing[3]}px`};
`;

const ComparisonHeaderItem = styled.div`
  width: 33%;
  padding: ${(props) => `0 ${props.theme.spacing[3]}px`};
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const ComparisonBody = styled.div`
  display: flex;
`;

const ComparisonBodyCategory = styled.div`
  width: ${(props) => `calc(25% - ${props.theme.spacing[3]}px)`};
  margin-right: ${(props) => `${props.theme.spacing[3]}px`};
  background: #3a3a3a;
`;

const ComparisonBodyCategoryItem = styled.div`
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  font-weight: bold;
`;

const ComparisonBodyMain = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: 90px 90px 90px 90px;
  border: 2px solid #3a3a3a;
  grid-gap: 1px;
  background: rgba(58, 58, 58, 0.5);
`;

const ComparisonBodyMainItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  padding: ${(props) => `0 ${props.theme.spacing[2]}px`};
  font-size: 14px;
  font-weight: bold;
  background: #1e1f23;
`;

const StyledTitle = styled.h1`
  color: ${(props) => props.theme.color.gold};
  font-size: 36px;
  font-weight: 700;
  margin-top: ${(props) => `0 ${props.theme.spacing[2]}px`};
  margin-bottom: ${(props) => `0 ${props.theme.spacing[2]}px`};
  padding: 0;
`;

const AuditsArea = styled.div`
  margin-top: 10px;
`;

export default Vaults;
