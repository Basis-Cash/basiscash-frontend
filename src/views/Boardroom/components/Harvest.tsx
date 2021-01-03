import React from 'react';
import styled from 'styled-components';
import Button from '../../../components/Button';
import Card from '../../../components/Card';
import CardContent from '../../../components/CardContent';
import CardIcon from '../../../components/CardIcon';
import Label from '../../../components/Label';
import TokenSymbol from '../../../components/TokenSymbol';
import Value from '../../../components/Value';
import useEarningsOnBoardroom from '../../../hooks/useEarningsOnBoardroom';
import useHarvestFromBoardroom from '../../../hooks/useHarvestFromBoardroom';
import { getDisplayBalance } from '../../../utils/formatBalance';

const Harvest: React.FC = ({}) => {
  const { onReward } = useHarvestFromBoardroom();
  const earnings = useEarningsOnBoardroom();

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon>
              <TokenSymbol symbol="EBTC" />
            </CardIcon>
            <Value value={getDisplayBalance(earnings)} />
            <Label text="Elastic Bitcoin Earned" />
          </StyledCardHeader>
          <StyledCardActions>
            <Button onClick={onReward} text="Claim Reward" disabled={earnings.eq(0)} />
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
