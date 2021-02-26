import React, { useContext, useMemo } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Link } from 'react-router-dom';
import useTreasuryAllocationTimes from '../../../hooks/useTreasuryAllocationTimes';
import moment from 'moment';
import ProgressCountdown from '../../Boardroom/components/ProgressCountdown';

import micCardBorderClicked from '../../../assets/img/mic-card-border-clicked.png';
import { ContractName } from '../../../basis-cash';
import useMigrationEndTime from '../../../hooks/useMigrationEndTime';
import useTokenBalance from '../../../hooks/useTokenBalance';
import ERC20 from '../../../basis-cash/ERC20';
import { getDisplayBalance } from '../../../utils/formatBalance';

interface HomeCardProps {
  title: string;
  backgroundImg: string;
  headerColor: string;
  button: React.ReactNode;
  contractName: ContractName;
  from: ERC20;
  to: ERC20;
}

export const HomeCard: React.FC<HomeCardProps> = ({
  title,
  backgroundImg,
  headerColor,
  button,
  contractName,
  from,
  to,
}) => {
  const endTime = useMigrationEndTime(contractName);

  const v1Balance = useTokenBalance(from);
  const v2Balance = useTokenBalance(to);

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
              <StyledV1Value>{getDisplayBalance(v1Balance, 18, 6)}</StyledV1Value>
            </CardSection>
            <SwapButton>{button}</SwapButton>
            <CardSection>
              <StyledV2Label>V2:</StyledV2Label>
              <StyledV2Value>{getDisplayBalance(v2Balance, 18, 6)}</StyledV2Value>
            </CardSection>
          </CardContent>
        </CardBody>
      </StyledCards>
      {
        endTime !== null &&
        <StyledProgressCountdown>
          <ProgressCountdown
            base={new Date(Date.now())}
            deadline={endTime}
            description="End Time"
          />
        </StyledProgressCountdown>
      }
    </Wrapper>
  );
};

interface HomeCard2Props {
  title: string;
  backgroundImg: string;
  headerColor: string;
  button1: React.ReactNode;
  button2: React.ReactNode;
  clickEvent: boolean;
  contractName: ContractName;
  from: ERC20;
  to: ERC20;
}

export const HomeCard2: React.FC<HomeCard2Props> = ({
  title,
  backgroundImg,
  headerColor,
  button1,
  button2,
  clickEvent,
  contractName,
  from,
  to,
}) => {
  const endTime = useMigrationEndTime(contractName);

  const v1Balance = useTokenBalance(from);
  const v2Balance = useTokenBalance(to);

  return (
    <Wrapper>
      <CardHeader color={headerColor}>{title}</CardHeader>
      <CardHeader color={headerColor}>V1 to V2</CardHeader>
      {clickEvent ? <StyledCards2>
        <CardBody backgroundImg={micCardBorderClicked}>
          <CardContent>
            <StyledBalanceLabel>Your Balance</StyledBalanceLabel>
            <StyledBalanceLabel2>Staked LP Balance</StyledBalanceLabel2>
            <CardSection>
              <StyledV1Label>V1:</StyledV1Label>
              <StyledV1Value>{getDisplayBalance(v1Balance, 18, 6)}</StyledV1Value>
            </CardSection>
            <SwapButton2>{button1}</SwapButton2>
            <SwapButton3>{button2}</SwapButton3>
            <CardSection>
              <StyledV2Label>V2:</StyledV2Label>
              <StyledV2Value>{getDisplayBalance(v2Balance, 18, 6)}</StyledV2Value>
            </CardSection>
          </CardContent>
        </CardBody>
      </StyledCards2> :
        <StyledCards2_>
          <CardBody backgroundImg={backgroundImg}>
            <CardContent>
              <StyledBalanceLabel>Your Balance</StyledBalanceLabel>
              <StyledBalanceLabel2>Staked LP Balance</StyledBalanceLabel2>
              <CardSection>
                <StyledV1Label>V1:</StyledV1Label>
                <StyledV1Value>{getDisplayBalance(v1Balance, 18, 6)}</StyledV1Value>
              </CardSection>
              <SwapButton2>{button1}</SwapButton2>
              <SwapButton3>{button2}</SwapButton3>
              <CardSection>
                <StyledV2Label>V2:</StyledV2Label>
                <StyledV2Value>{getDisplayBalance(v2Balance, 18, 6)}</StyledV2Value>
              </CardSection>
            </CardContent>
          </CardBody>
        </StyledCards2_>
      }
      {/* <StyledCards2>
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
      </StyledCards2> */}
      <StyledProgressCountdown clickEvent={clickEvent}>
        <ProgressCountdown
          base={new Date(Date.now())}
          deadline={endTime}
          description="End Time"
        />
      </StyledProgressCountdown>
    </Wrapper>
  );
};

interface HomeCard3Props {
  title: string;
  backgroundImg: string;
  headerColor: string;
  button: React.ReactNode;
  clickEvent: boolean;
}

export const HomeCard3: React.FC<HomeCard3Props> = ({
  title,
  backgroundImg,
  headerColor,
  button,
  clickEvent
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
      {clickEvent ? <StyledCards3>
        <CardBody backgroundImg={micCardBorderClicked}>
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
      </StyledCards3> :
        <StyledCards3_>
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
        </StyledCards3_>
      }
      <StyledProgressCountdown2 clickEvent={clickEvent}>
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
  margin-top: 60px;
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
  border: 2px solid #1e1f23;
  border-radius: 20px;
  margin-top: 25px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledCards2 = styled.div`
  color: ${(props) => props.theme.color.white};
  padding: ${(props) => props.theme.spacing[3]}px;
  background-color: #26272D;
  border: 2px solid #1e1f23;
  border-radius: 20px;
  margin-top: 25px;
  @media (max-width: 768px) {
    width: 100%;
  }

  cursor: pointer;
  border: 2px solid #AB8D60;
  border-radius: 20px;
`;

const StyledCards2_ = styled.div`
  color: ${(props) => props.theme.color.white};
  padding: ${(props) => props.theme.spacing[3]}px;
  background-color: #26272D;
  border: 2px solid #1e1f23;
  border-radius: 20px;
  margin-top: 25px;
  @media (max-width: 768px) {
    width: 100%;
  }

  cursor: pointer;
  :hover {
    border: 2px solid #AB8D60;
    border-radius: 20px;
  }
`;

const StyledCards3 = styled.div`
  color: ${(props) => props.theme.color.white};
  padding: ${(props) => props.theme.spacing[3]}px;
  background-color: #26272D;
  border: 2px solid #1e1f23;
  border-radius: 20px;
  margin-top: 25px;
  @media (max-width: 768px) {
    width: 100%;
  }
  position: relative;
  top: 30px;
  margin-bottom: 20px;

  cursor: pointer;
  border: 2px solid #AB8D60;
  border-radius: 20px;
`;

const StyledCards3_ = styled.div`
  color: ${(props) => props.theme.color.white};
  padding: ${(props) => props.theme.spacing[3]}px;
  background-color: #26272D;
  border: 2px solid #1e1f23;
  border-radius: 20px;
  margin-top: 25px;
  @media (max-width: 768px) {
    width: 100%;
  }
  position: relative;
  top: 30px;
  margin-bottom: 20px;

  cursor: pointer;
  :hover {
    border: 2px solid #AB8D60;
    border-radius: 20px;
  }
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
  left: 38px;
  width: 300px;
  top: -20px;
`

const SwapButton2 = styled.div`
  margin-top: ${props => props.theme.spacing[2]}px;
  position: relative;
  width: 300px;
  top: -20px;
`

const SwapButton3 = styled.div`
  margin-top: ${props => props.theme.spacing[2]}px;
  position: relative;
  left: 38px;
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
  padding: 5px 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  pointer-events: ${props => !props.disabled ? undefined : 'none'};
  font-weight: 700;
  min-width: 150px;

  &:hover {
    background-color: ${props => props.theme.color.gold};
    color: #43423F;
  }
`

const Button2 = styled.button<ButtonProps>`
  background-color: ${props => !props.disabled ? '#826337' : '#303030'};
  border-radius: 10px;
  border: 0;
  color: ${props => !props.disabled ? props.theme.color.gold : '#4F4F4F'};
  padding: 5px 10px;
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
  margin-right: 5px;
  width: 20px;
  height: 20px;
`

const ButtonText = styled.span`
  text-align: center;
  width: 100%;
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

export const MigrationButton2: React.FC<MigrationButtonProps> = ({
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
    <Button2 onClick={onClick} disabled={disabled} padding={buttonPadding}>
      {icon && <ButtonIcon src={icon} />}
      {to ? (
        <StyledLink to={to}>{text}</StyledLink>
      ) : (
          <ButtonText>{text}</ButtonText>
        )}
    </Button2>
  )
}

interface StyledProgressCountdownProps {
  clickEvent?: boolean;
}

const StyledProgressCountdown = styled.div<StyledProgressCountdownProps>`
  position: relative;
  margin-top: ${props => props.theme.spacing[3]}px;
  padding: ${(props) => props.theme.spacing[3]}px ${(props) => props.theme.spacing[4]}px;
  background: #26272D;
  border: ${props => props.clickEvent ? '2px solid #AB8D60' : '2px solid #1e1f23'};
  box-sizing: border-box;
  box-shadow: inset 0px 0px 13px rgba(248, 217, 117, 0.5);
  border-radius: 20px;
`;

interface StyledProgressCountdown2Props {
  clickEvent?: boolean;
}

const StyledProgressCountdown2 = styled.div<StyledProgressCountdown2Props>`
  position: relative;
  margin-top: ${props => props.theme.spacing[6]}px;
  padding: ${(props) => props.theme.spacing[3]}px ${(props) => props.theme.spacing[4]}px;
  background: #26272D;
  border: ${props => props.clickEvent ? '2px solid #AB8D60' : '2px solid #1e1f23'};
  box-sizing: border-box;
  box-shadow: inset 0px 0px 13px rgba(248, 217, 117, 0.5);
  border-radius: 20px;
`;
