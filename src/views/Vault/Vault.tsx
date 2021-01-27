import React, { useEffect } from 'react';
import styled from 'styled-components';

import { useParams } from 'react-router-dom';
import { useWallet } from 'use-wallet';

import Button from '../../components/Button';
import PageHeader from '../../components/PageHeader';
import Spacer from '../../components/Spacer';
import Deposit from './components/Deposit';
import useVault from '../../hooks/useVault';
import { Vault as VaultEntity } from '../../basis-cash';

const Vault: React.FC = () => {
  useEffect(() => window.scrollTo(0, 0));

  const { vaultId } = useParams();
  const vault = useVault(vaultId);

  const { account } = useWallet();

  return account && vault ? (
    <>
      <PageHeader
        subtitle={`Deposit ${vault?.tokenName} and earn ${vault?.tokenName}`}
        title={vault?.name}
      />
      <StyledVault>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <Deposit vault={vault} />
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg" />
        <LPTokenHelpText vault={vault} />
        <Spacer size="lg" />
        <Spacer size="lg" />
      </StyledVault>
    </>
  ) : !vault ? (
    <VaultNotFound />
  ) : (
    <UnlockWallet />
  );
};

const LPTokenHelpText: React.FC<{ vault: VaultEntity }> = ({ vault }) => {
  let pairName: string;
  let sushiswapUrl: string;
  if (vault.tokenName.includes('MIC')) {
    pairName = 'MIC-USDT pair';
    sushiswapUrl = 'https://sushiswap.fi/pair/0xC9cB53B48A2f3A9e75982685644c1870F1405CCb';
  } else {
    pairName = 'MIS-USDT pair';
    sushiswapUrl = 'https://sushiswap.fi/pair/0x066F3A3B7C8Fa077c71B9184d862ed0A4D5cF3e0';
  }
  return (
    <StyledLink href={sushiswapUrl} target="_blank">
      {`🍣  Provide liquidity to ${pairName} on SushiSwap  🍣`}
    </StyledLink>
  );
};

const VaultNotFound = () => {
  return (
    <Center>
      <PageHeader title="Not Found" subtitle="You've hit a vault just robbed by chefs." />
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

const StyledVault = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledLink = styled.a`
  font-weight: 700;
  text-decoration: none;
  color: ${(props) => props.theme.color.primary.main};
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

export default Vault;
