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
  useEffect(() => window.scrollTo(0, 0));

  const { bankId } = useParams();
  const bank = useBank(bankId);

  const { ethereum, account } = useWallet();
  const tokenContract = useMemo(
    () => getContract(ethereum as provider, bank?.depositTokenAddress),
    [ethereum, bank?.depositTokenAddress],
  );

  const { onRedeem } = useRedeem(bank?.contract);
  return account && bank ? (
    <>
      <PageHeader
        icon="🏦"
        subtitle={`Deposit ${bank?.depositTokenName} and earn ${bank?.earnTokenName}`}
        title={bank?.name}
      />
      <StyledBank>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <Harvest
              poolContract={bank?.contract}
              tokenName={bank?.earnTokenName}
            />
          </StyledCardWrapper>
          <Spacer />
          <StyledCardWrapper>
            <Stake
              poolContract={bank?.contract}
              tokenContract={tokenContract}
              tokenName={bank?.depositTokenName}
              tokenIcon={bank?.icon}
            />
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg" />
        <div>
          <Button onClick={onRedeem} text="Settle & Withdraw" />
        </div>
        <Spacer size="lg" />
      </StyledBank>
    </>
  ) : !bank ? (
    <BankNotFound />
  ) : (
    <UnlockWallet />
  );
};

const BankNotFound = () => {
  return (
    <Center>
      <PageHeader
        icon="🏚"
        title="Not Found"
        subtitle="You've hit a bank just robbed by unicorns."
      />
    </Center>
  );
};

const UnlockWallet = () => {
  const { connect } = useWallet();
  return (
    <Center>
      <Button onClick={() => connect('injected')} text="Unlock Wallet" />
    </Center>
  );
};

const StyledBank = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledCardsWrapper = styled.div`
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

const Center = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default Bank;
