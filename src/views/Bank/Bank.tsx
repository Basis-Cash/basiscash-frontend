import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';

import { useParams } from 'react-router-dom';
import { useWallet } from 'use-wallet';
import { provider } from 'web3-core';

import Button from '../../components/Button';
import PageHeader from '../../components/PageHeader';
import Spacer from '../../components/Spacer';
import Harvest from './components/Harvest';
import Stake from './components/Stake';

import useBank from '../../hooks/useBank';
import useRedeem from '../../hooks/useRedeem';
import { getContract } from '../../utils/erc20';

const Bank: React.FC = () => {
  const { bankId } = useParams()
  const {
    contract,
    depositToken,
    depositTokenAddress,
    earnToken,
    name,
    icon,
  } = useBank(bankId) || {
    depositToken: '',
    depositTokenAddress: '',
    earnToken: '',
    name: '',
    icon: ''
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  const { ethereum } = useWallet()

  const tokenContract = useMemo(() => {
    return getContract(ethereum as provider, depositTokenAddress)
  }, [ethereum, depositTokenAddress])

  const { onRedeem } = useRedeem(contract)

  const depositTokenName = useMemo(() => {
    return depositToken.toUpperCase()
  }, [depositToken])

  const earnTokenName = useMemo(() => {
    return earnToken.toUpperCase()
  }, [earnToken])

  return (
    <>
      <PageHeader
        icon={"🏦"}
        subtitle={`Deposit ${depositTokenName} and earn ${earnTokenName}`}
        title={'Pick a Bank'}
      />
      <StyledBank>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <Harvest poolContract={contract} />
          </StyledCardWrapper>
          <Spacer />
          <StyledCardWrapper>
            <Stake
              poolContract={contract}
              tokenContract={tokenContract}
              tokenName={depositToken.toUpperCase()}
            />
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg" />
        <div>
          <Button
            onClick={onRedeem}
            text="Settle & Withdraw"
          />
        </div>
        <Spacer size="lg" />
      </StyledBank>
    </>
  )
}

const StyledBank = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 600px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`

export default Bank;
