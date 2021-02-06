import React, { useContext, useMemo } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Link } from 'react-router-dom';
import useTreasuryAllocationTimes from '../../../hooks/useTreasuryAllocationTimes';
import moment from 'moment';
import ProgressCountdown from '../../Boardroom/components/ProgressCountdown';

interface HomeCardProps {
  title: string;
  backgroundImg: string;
  headerColor: string;
  button: React.ReactNode;
}

export const HomeCard: React.FC<HomeCardProps> = ({
  title,
  backgroundImg,
  headerColor,
  button
}) => {
  const { color } = useContext(ThemeContext);
  const { prevAllocation, nextAllocation } = useTreasuryAllocationTimes();
  const prevEpoch = useMemo(
    () =>
      nextAllocation.getTime() <= Date.now()
        ? moment().utc().startOf('day').toDate()
        : prevAllocation,
    [prevAllocation, nextAllocation],
  );
  const nextEpoch = useMemo(() => moment(prevEpoch).add(6, 'hours').toDate(), [prevEpoch]);

  return (
    <Wrapper>
      <CardHeader color={headerColor}>{title}</CardHeader>
      <CardHeader color={headerColor}>V1 to V2</CardHeader>
      <StyledCards>
        <CardBody backgroundImg={backgroundImg}>
          <CardContent>
            <StyledBalanceLabel>Your Balance</StyledBalanceLabel>
            &nbsp;
            &nbsp;
            <CardSection>
              <StyledV1Label>V1:</StyledV1Label>
              <StyledV1Value>1,000</StyledV1Value>
            </CardSection>
            <SwapButton>{button}</SwapButton>
            <CardSection>
              <StyledV2Label>V2:</StyledV2Label>
              <StyledV2Value>0</StyledV2Value>
            </CardSection>
          </CardContent>
        </CardBody>
      </StyledCards>
      <StyledProgressCountdown>
        <ProgressCountdown
          base={prevEpoch}
          deadline={nextEpoch}
          description="Next Epoch"
        />
      </StyledProgressCountdown>
    </Wrapper>
  );
};

interface HomeCard2Props {
  title: string;
  backgroundImg: string;
  headerColor: string;
  button1: React.ReactNode;
  button2: React.ReactNode;
}

export const HomeCard2: React.FC<HomeCard2Props> = ({
  title,
  backgroundImg,
  headerColor,
  button1,
  button2,
}) => {
  const { color } = useContext(ThemeContext);
  const { prevAllocation, nextAllocation } = useTreasuryAllocationTimes();
  const prevEpoch = useMemo(
    () =>
      nextAllocation.getTime() <= Date.now()
        ? moment().utc().startOf('day').toDate()
        : prevAllocation,
    [prevAllocation, nextAllocation],
  );
  const nextEpoch = useMemo(() => moment(prevEpoch).add(6, 'hours').toDate(), [prevEpoch]);

  return (
    <Wrapper>
      <CardHeader color={headerColor}>{title}</CardHeader>
      <CardHeader color={headerColor}>V1 to V2</CardHeader>
      <StyledCards>
        <CardBody backgroundImg={backgroundImg}>
          <CardContent>
            <StyledBalanceLabel>Your Balance</StyledBalanceLabel>
            <StyledBalanceLabel2>Staked LP Balance</StyledBalanceLabel2>
            <CardSection>
              <StyledV1Label>V1:</StyledV1Label>
              <StyledV1Value>1,000</StyledV1Value>
            </CardSection>
            <SwapButton2>{button1}</SwapButton2>
            <SwapButton3>{button2}</SwapButton3>
            <CardSection>
              <StyledV2Label>V2:</StyledV2Label>
              <StyledV2Value>0</StyledV2Value>
            </CardSection>
          </CardContent>
        </CardBody>
      </StyledCards>
      <StyledProgressCountdown>
        <ProgressCountdown
          base={prevEpoch}
          deadline={nextEpoch}
          description="Next Epoch"
        />
      </StyledProgressCountdown>
    </Wrapper>
  );
};

export const HomeCard3: React.FC<HomeCardProps> = ({
  title,
  backgroundImg,
  headerColor,
  button
}) => {
  const { color } = useContext(ThemeContext);
  const { prevAllocation, nextAllocation } = useTreasuryAllocationTimes();
  const prevEpoch = useMemo(
    () =>
      nextAllocation.getTime() <= Date.now()
        ? moment().utc().startOf('day').toDate()
        : prevAllocation,
    [prevAllocation, nextAllocation],
  );
  const nextEpoch = useMemo(() => moment(prevEpoch).add(6, 'hours').toDate(), [prevEpoch]);

  return (
    <Wrapper>
      <CardHeader color={headerColor}>{title}</CardHeader>
      <StyledCards2>
        <CardBody backgroundImg={backgroundImg}>
          <CardContent>
            <StyledBalanceLabel>Your Balance</StyledBalanceLabel>
            <CardSection>
              <StyledV1Label>MIB:</StyledV1Label>
              <StyledV1Value>1,000</StyledV1Value>
            </CardSection>
            <SwapButton>{button}</SwapButton>
            <CardSection>
              <StyledV2Label>MIC:</StyledV2Label>
              <StyledV2Value>0</StyledV2Value>
            </CardSection>
          </CardContent>
        </CardBody>
      </StyledCards2>
      <StyledProgressCountdown2>
        <ProgressCountdown
          base={prevEpoch}
          deadline={nextEpoch}
          description="Next Epoch"
        />
      </StyledProgressCountdown2>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  @media (max-width: 768px) {
    margin-top: ${(props) => props.theme.spacing[4]}px;
  }
`;

const CardHeader = styled.h2`
  color: ${(props) => props.color};
  text-align: center;
  margin: 0;
`;

interface StyledCardsProps {
  backgroundImg: string;
}

const StyledCards = styled.div`
  color: ${(props) => props.theme.color.white};
  padding: ${(props) => props.theme.spacing[3]}px;
  background-color: #26272D;
  border-radius: 20px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledCards2 = styled.div`
  color: ${(props) => props.theme.color.white};
  padding: ${(props) => props.theme.spacing[3]}px;
  background-color: #26272D;
  border-radius: 20px;
  @media (max-width: 768px) {
    width: 100%;
  }
  position: relative;
  top: 30px;
  margin-bottom: 20px;
`;

const StyledBalanceLabel = styled.span`
  text-align: center;
  font-size: 14px;
  color: ${props => props.theme.color.gold};
  position: relative;
  top: -20px;
`;

const StyledBalanceLabel2 = styled.span`
  text-align: center;
  font-size: 14px;
  color: ${props => props.theme.color.white};
  position: relative;
  top: -20px;
`;

const StyledV1Label = styled.span`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: ${props => props.theme.color.white};
`;

const StyledV1Value = styled.span`
  display: inline-block;
  font-size: 18px;
  font-weight: bold;
  color: ${props => props.theme.color.white};
`;

const StyledV2Label = styled.span`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: ${props => props.theme.color.gold};
`;

const StyledV2Value = styled.span`
  display: inline-block;
  font-size: 18px;
  font-weight: bold;
  color: ${props => props.theme.color.gold};
`;

const CardBody = styled.div<StyledCardsProps>`
  width: 267px;
  height: 347px;
  background-image: url("${(props) => props.backgroundImg}");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;

const CardContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  top: 51%;
  height: 50%;
  box-sizing: border-box;
  padding: 24px;
`;

const CardSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
  top: -20px;
`;

const SwapButton = styled.div`
  margin-top: ${props => props.theme.spacing[2]}px;
  position: relative;
  left: 25%;
  width: 300px;
  top: -20px;
`

const SwapButton2 = styled.div`
  margin-top: ${props => props.theme.spacing[2]}px;
  position: relative;
  left: -10px;
  width: 300px;
  top: -20px;
`

const SwapButton3 = styled.div`
  margin-top: ${props => props.theme.spacing[2]}px;
  position: relative;
  left: 23px;
  width: 300px;
  top: -20px;
`

interface ButtonProps {
  padding: number;
  disabled?: boolean;
}

const Button = styled.button<ButtonProps>`
  background-color: ${props => !props.disabled ? '#43423F' : '#303030'};
  border-radius: 10px;
  border: 0;
  color: ${props => !props.disabled ? props.theme.color.gold : '#4F4F4F'};
  padding-top: ${props => props.theme.spacing[2]}px;
  padding-bottom: ${props => props.theme.spacing[2]}px;
  padding-left: ${props => props.padding}px;
  padding-right: ${props => props.padding}px;
  display: flex;
  align-items: center;
  cursor: pointer;
  pointer-events: ${props => !props.disabled ? undefined : 'none'};
  font-weight: 700;

  &:hover {
    background-color: ${props => props.theme.color.gold};
    color: #43423F;
  }
`

const ButtonIcon = styled.img`
  margin-right: ${props => props.theme.spacing[3]}px;
  width: 20px;
  height: 20px;
`

const ButtonText = styled.span`
`

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`

interface MigrationButtonProps {
  icon?: string;
  text: string;
  disabled?: boolean;
  onClick?: () => void;
  to?: string;
  size?: 'sm' | 'md',
}

export const MigrationButton: React.FC<MigrationButtonProps> = ({
  icon,
  text,
  disabled,
  onClick,
  to,
  size,
}) => {
  const { spacing } = useContext(ThemeContext)

  let buttonPadding: number;
  switch (size) {
    case 'sm':
      buttonPadding = spacing[3]
      break
    case 'md':
    default:
      buttonPadding = spacing[5]
  }

  return (
    <Button onClick={onClick} disabled={disabled} padding={buttonPadding}>
      {icon && <ButtonIcon src={icon} />}
      {to ? (
        <StyledLink to={to}>{text}</StyledLink>
      ) : (
          <ButtonText>{text}</ButtonText>
        )}
    </Button>
  )
}

const StyledProgressCountdown = styled.div`
  position: relative;
  margin-top: ${props => props.theme.spacing[3]}px;
  padding: ${(props) => props.theme.spacing[2]}px ${(props) => props.theme.spacing[4]}px;
  background: #26272D;
  border: 2px solid #DBC087;
  box-sizing: border-box;
  box-shadow: 0px 0px 20px rgba(219, 192, 135, 0.5), 0px 10px 20px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
`;

const StyledProgressCountdown2 = styled.div`
  position: relative;
  margin-top: ${props => props.theme.spacing[6]}px;
  padding: ${(props) => props.theme.spacing[2]}px ${(props) => props.theme.spacing[4]}px;
  background: #26272D;
  border: 2px solid #DBC087;
  box-sizing: border-box;
  box-shadow: 0px 0px 20px rgba(219, 192, 135, 0.5), 0px 10px 20px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
`;
