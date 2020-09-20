import React, { useState } from 'react';
import { BigNumber } from 'ethers';
import styled from 'styled-components';

import Button from '../../../components/Button';
import TokenSymbol from '../../../components/TokenSymbol';
import Card from '../../../components/Card';
import CardContent from '../../../components/CardContent';
import Label from '../../../components/Label';
import Value from '../../../components/Value';
import { getDisplayBalance } from '../../../utils/formatBalance';
import CardIcon from '../../../components/CardIcon';

interface HarvestProps {
  // poolContract: Contract;
  // tokenName: string;
}

const Harvest: React.FC<HarvestProps> = ({ }) => {
  // const earnings = useEarnings(poolContract);
  // const { onReward } = useReward(poolContract);
  const [earnings, setEarnings] = useState(BigNumber.from(0));

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon>
              <TokenSymbol symbol="BAC" />
            </CardIcon>
            <Value value={getDisplayBalance(earnings)} />
            <Label text="Basis Cash Earned" />
          </StyledCardHeader>
          <StyledCardActions>
            <Button onClick={() => {}} text="Settle" disabled={!earnings.toNumber()} />
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
