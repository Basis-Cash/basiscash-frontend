import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Link } from 'react-router-dom';
import pool from '../../../assets/img/pool.png';
import gift from '../../../assets/img/gift.png';
import useHarvestFromBoardroom from '../../../hooks/useHarvestFromBoardroom';
import useHarvestEpochFromBoardroom from '../../../hooks/useHarvestEpochFromBoardroom';
import useEarningsOnBoardroom from '../../../hooks/useEarningsOnBoardroom';
import useEpochEarningsOnBoardroom from '../../../hooks/useEpochEarningsOnBoardroom';
import { getDisplayBalance } from '../../../utils/formatBalance';

interface MonetaryCardHeaderProps {
  color: string;
  icon: string;
  title: string;
  description: string;
}

export const MonetaryCardHeader: React.FC<MonetaryCardHeaderProps> = ({
  color,
  icon,
  title,
  description,
}) => {
  return (
    <HeaderWrapper>
      <HeaderLogoWrapper>
        <HeaderLogo src={icon} />
        <HeaderTitle color={color}>{title}</HeaderTitle>
      </HeaderLogoWrapper>
      <HeaderDescription>
        {description}
      </HeaderDescription>
    </HeaderWrapper>
  )
}

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${props => props.theme.spacing[4]}px;
  border-bottom: ${props => props.theme.color.grey[800]} 1px solid;
`

const HeaderLogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: ${props => props.theme.spacing[4]}px;
`

const HeaderLogo = styled.img`
  width: 38px;
  height: 38px;
`

const HeaderTitle = styled.div`
  font-size: 22px;
  color: ${props => props.color};
`

const HeaderDescription = styled.span`
  font-size: 14px;
  margin-top: ${props => props.theme.spacing[4]}px;
`

interface MonetaryCardStakedBalanceProps {
  title: string;
  value: string;
  children?: React.ReactNode;
}

export const MonetaryCardStakedBalance: React.FC<MonetaryCardStakedBalanceProps> = ({
  title,
  value,
  children,
}) => {
  return (
    <BodyWrapper>
      <BodyTitle>{title}</BodyTitle>
      <BodyValue>{value}</BodyValue>
      <BodyChildren>
        {children}
      </BodyChildren>
    </BodyWrapper>
  )
}

interface MonetaryCardEffectiveBalanceProps {
  title: string;
  value: string;
}

export const MonetaryCardEffectiveBalance: React.FC<MonetaryCardEffectiveBalanceProps> = ({
  title,
  value,
}) => {
  return (
    <BodyWrapper>
      <BodyTitle>{title}</BodyTitle>
      <BodyValue2>{value}</BodyValue2>
    </BodyWrapper>
  )
}

const BodyWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: ${props => props.theme.spacing[4]}px;
  border-bottom: ${props => props.theme.color.grey[800]} 1px solid;
`

const BodyTitle = styled.div`
  text-align: left;
  flex-grow: 1;
`

const BodyValue = styled.div`
  color: ${props => props.theme.color.white};
  font-size: 24px;
  text-align: left;
  flex-grow: 1;
`

const BodyValue2 = styled.div`
  color: ${props => props.theme.color.white};
  font-size: 24px;
  text-align: left;
  flex-grow: 1;
  margin-left: -280px;
`

const BodyChildren = styled.div`
  display: flex;
  margin-left: ${props => props.theme.spacing[3]}px;
  text-align: left;
`

interface MonetaryCardFootProps {
  children: React.ReactNode;
}

export const MonetaryCardFoot: React.FC<MonetaryCardFootProps> = ({
  children
}) => {
  return (
    <MonetaryCardFootWrapper>
      {children}
    </MonetaryCardFootWrapper>
  )
}

const MonetaryCardFootWrapper = styled.div`
  display: flex;
`

interface MonetaryCardFootCellProps {
  title: string;
  value: string;
  button: React.ReactNode;
  disabledReason?: string;
}

export const MonetaryCardFootCell: React.FC<MonetaryCardFootCellProps> = ({
  title,
  value,
  button,
  disabledReason,
}) => {
  return (
    <Foot>
      <FootTitle>{title}</FootTitle>
      <FootValue>{value}</FootValue>
      <FootButton>{button}</FootButton>
    </Foot>
  )
}

const Foot = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 1 100%;
  align-items: center;
  padding: ${props => props.theme.spacing[4]}px;
  &:first-child {
    border-right: ${props => props.theme.color.grey[800]} 1px solid;
  }
  width: 100%;
`
const FootTitle = BodyTitle;
const FootValue = BodyValue;
const FootButton = styled.div`
  margin-top: ${props => props.theme.spacing[2]}px;
`

interface MonetaryCardButtonProps {
  icon?: string;
  text: string;
  disabled?: boolean;
  onClick?: () => void;
  to?: string;
  size?: 'sm' | 'md',
}

export const MonetaryCardButton: React.FC<MonetaryCardButtonProps> = ({
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

interface MonetaryClaimButtonProps {
  icon?: string;
  text: string;
  disabled?: boolean;
  onClick?: () => void;
  to?: string;
  size?: 'sm' | 'md',
  color?: string,
  width?: string,
  backgroundColor?: string,
  colorHover?: string,
  backgroundColorHover?: string
}

export const MonetaryClaimButton: React.FC<MonetaryClaimButtonProps> = ({
  icon,
  text,
  disabled,
  onClick,
  to,
  size,
  color,
  width = '100%',
  backgroundColor,
  colorHover = '#43423F',
  backgroundColorHover
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
    <ClaimButton onClick={onClick} disabled={disabled} padding={buttonPadding} width={width} colorHover={colorHover} backgroundColor={backgroundColor} backgroundColorHover={backgroundColorHover} color={color} >
      {icon && <ButtonIcon src={icon} />}
      {to ? (
        <StyledLink to={to}>{text}</StyledLink>
      ) : (
          <ButtonText color={color}>{text}</ButtonText>
        )}
    </ClaimButton>
  )
}

interface MonetaryClaimAllButtonProps {
  icon?: string;
  text: string;
  disabled?: boolean;
  onClick?: () => void;
  to?: string;
  size?: 'sm' | 'md',
  color?: string,
  width?: string,
  backgroundColor?: string,
  colorHover?: string,
  backgroundColorHover?: string
}

export const MonetaryClaimAllButton: React.FC<MonetaryClaimAllButtonProps> = ({
  icon,
  text,
  disabled,
  onClick,
  to,
  size,
  color,
  width = '100%',
  backgroundColor,
  colorHover = '#43423F',
  backgroundColorHover
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
    <ClaimAllButton onClick={onClick} disabled={disabled} padding={buttonPadding} width={width} colorHover={colorHover} backgroundColor={backgroundColor} backgroundColorHover={backgroundColorHover} color={color} >
      {icon && <ButtonIcon src={icon} />}
      {to ? (
        <StyledLink to={to}>{text}</StyledLink>
      ) : (
          <ButtonText color={color}>{text}</ButtonText>
        )}
    </ClaimAllButton>
  )
}

interface ButtonProps {
  padding: number;
  disabled?: boolean;
  width?: string;
  colorHover?: string;
  color?: string;
  backgroundColor?: any;
  backgroundColorHover?: string;
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

const ClaimButton = styled.button<ButtonProps>`
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
  width: 140px;
  justify-content: space-between;
`

const ClaimAllButton = styled.button<ButtonProps>`
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
  width: 1050px;
  justify-content: center;
`

const ButtonIcon = styled.img`
  margin-left: -${props => props.theme.spacing[4]}px;
  margin-right: ${props => props.theme.spacing[2]}px;
  width: 20px;
  height: 20px;
`

const ButtonText = styled.span`
`

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`
interface MonetaryStakeCardProps {
  day: string;
  fee: string;
  epoch: number;
  disabledReason?: string;
}

export const MonetaryStakeCard: React.FC<MonetaryStakeCardProps> = ({
  day,
  fee,
  epoch,
}) => {
  const { onReward } = useHarvestEpochFromBoardroom(epoch);
  const earnedMIC = useEpochEarningsOnBoardroom(epoch);

  return (
    <StakeWrapper>
      <StakeTitle>{day}</StakeTitle>
      <StakeTitle>{fee}</StakeTitle>
      <StakeLogo src={pool} />
      <StakeRewards>{getDisplayBalance(earnedMIC, 18, 3) + ' MIC2'}</StakeRewards>
      <StakeButton>
        {<MonetaryClaimButton
          text='Claim MIC2'
          onClick={onReward}
          disabled={earnedMIC.eq(0)}
          width="15%"
          icon={gift}
          backgroundColor="#43423F"
          colorHover="#DBC087"
          backgroundColorHover="#43423F"
          color="#DBC087" />}
      </StakeButton>
    </StakeWrapper>
  )
}

const StakeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StakeLogo = styled.img`
  margin: 0 ${props => props.theme.spacing[2]}px;
`

const StakeTitle = styled.h4`
  font-size: 14px;
  text-algn: center;
  margin: 0;
`

const StakeRewards = styled.h3`
  text-algn: center;
  margin: 0;
  color: ${props => props.theme.color.gold};
`

const StakeButton = styled.div`
  margin-top: ${props => props.theme.spacing[2]}px;
`
