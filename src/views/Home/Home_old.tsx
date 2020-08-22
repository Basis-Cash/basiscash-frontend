import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

import { useWallet } from 'use-wallet'

import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'

import useYam from '../../hooks/useYam'

import Rebase from './components/Rebase'
import Stats from './components/Stats'
import Vote from './components/Vote'

import { OverviewData } from './types'
import { getStats } from './utils'

const Home: React.FC = () => {

  const { account } = useWallet()


  return (
    <Page>
      <PageHeader icon="👋" subtitle="Buy, sell, and provide liquidity for Basis Cash and Basis Shares on Uniswap" title="Welcome to Basis Cash!" />
      <Spacer />
      <div>
        <StyledOverview>
          <StyledSpacer />
          <UniswapWidget />
          <StyledSpacer />
          <UniswapWidget />
        </StyledOverview>
        <StyledSpacer />
      </div>
    </Page>
  )
}

const StyledOverview = styled.div`
  align-items: center;
  display: flex;
`

const StyledSpacer = styled.div`
  height: ${props => props.theme.spacing[4]}px;
  width: ${props => props.theme.spacing[4]}px;
`
const UniswapStyler = {
  border: 'none'
};

const UniswapWidget: React.FC = () => {
  return (
    <iframe src="https://app.uniswap.org" width="540px" height="720px" style={UniswapStyler}>
    </iframe>
  )
}

const StyledLink = styled.a`
  font-weight: 700l
  text-decoration: none;
  color: ${props => props.theme.color.primary.main};
`

export default Home