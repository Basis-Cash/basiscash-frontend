import React from 'react'
import {
  Route,
  Switch,
  useRouteMatch,
} from 'react-router-dom'
import { useWallet } from 'use-wallet'

import CardIcon from '../../components/CardIcon'
import Button from '../../components/Button'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import BondCard from './BondCard'
// import FarmCards from './components/FarmCards'

const Bank: React.FC = () => {
  const { path } = useRouteMatch()
  const { account, connect } = useWallet()
  return (
    <Switch>
      <Page>
      {/* {!!account ? ( */}
      {true ? (
        <>
          <Route exact path={path}>
            <PageHeader
              icon={"🏦"}
              title="Buy Bonds"
              subtitle="Earn premiums upon redemption"
            />
          </Route>
          <BondCard />
        </>
      ) : (
        <div style={{
          alignItems: 'center',
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
        }}>
          <Button
            onClick={() => connect('injected')}
            text="Unlock Wallet"
          />
        </div>
      )}
      </Page>
    </Switch>
  )
}


export default Bank