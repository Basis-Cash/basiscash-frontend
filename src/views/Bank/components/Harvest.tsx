import React from 'react';
import styled from 'styled-components';

import { Contract } from 'ethers';

import Button from '../../../components/Button';
import Card from '../../../components/Card';
import CardContent from '../../../components/CardContent';
import CardIcon from '../../../components/CardIcon';
import Label from '../../../components/Label';
import Value from '../../../components/Value';

import useEarnings from '../../../hooks/useEarnings';
import useReward from '../../../hooks/useReward';

import { getDisplayBalance } from '../../../utils/formatBalance';
import TokenSymbol from '../../../components/TokenSymbol';

interface HarvestProps {
  poolContract: Contract;
  tokenName: string;
}

const Harvest: React.FC<HarvestProps> = ({ poolContract, tokenName }) => {
  const earnings = useEarnings(poolContract);
  const { onReward } = useReward(poolContract);

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon>
              <TokenSymbol symbol={tokenName === 'Share' ? 'BAS' : 'BAC'} />
            </CardIcon>
            <Value value={getDisplayBalance(earnings)} />
            <Label text={`Basis ${tokenName} Earned`} />
          </StyledCardHeader>
          <StyledCardActions>
            <Button onClick={onReward} text="Settle" disabled={!earnings.toNumber()} />
          </StyledCardActions>
        </StyledCardContentInner>
      </CardContent>
    </Card>
  );
};

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[6]}px;
  width: 100%;
`;

const StyledSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`;

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export default Harvest;
