import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Link } from 'react-router-dom';
import pool from '../../../assets/img/pool.png';

interface MigrationClaimButtonProps {
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

export const MigrationClaimButton: React.FC<MigrationClaimButtonProps> = ({
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

interface ButtonProps {
  padding: number;
  disabled?: boolean;
  width?: string;
  colorHover?: string;
  color?: string;
  backgroundColor?: any;
  backgroundColorHover?: string;
}

const ClaimButton = styled.button<ButtonProps>`
  background-color: ${props => !props.disabled ? '#43423F' : '#303030'};
  border-radius: 10px;
  border: 0;
  color: ${props => !props.disabled ? props.theme.color.gold : '#4F4F4F'};
  padding-top: ${props => props.theme.spacing[2]}px;
  padding-bottom: ${props => props.theme.spacing[2]}px;
  padding-left: ${props => props.theme.spacing[5]}px;
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
interface MigrationCardProps {
  day: string;
  button: React.ReactNode;
  disabledReason?: string;
}

export const MigrationCard: React.FC<MigrationCardProps> = ({
  day,
  button
}) => {
  return (
    <>
      <StakeWrapper>
        <StakeTitle>{day}</StakeTitle>
        <StakeLogo src={pool} />
        <StakeRewards>1000 MIC</StakeRewards>
        <StakeButton>{button}</StakeButton>
      </StakeWrapper>
    </>
  )
}

interface MigrationCard2Props {
  day: string;
  fee: string;
  button: React.ReactNode;
  disabledReason?: string;
}

export const MigrationCard2: React.FC<MigrationCard2Props> = ({
  day,
  fee,
  button
}) => {
  return (
    <StakeWrapper>
      <StakeTitle1>{day}</StakeTitle1>
      <StakeTitle2>{fee}</StakeTitle2>
      <StakeLogo src={pool} />
      <StakeRewards>1000 MIC</StakeRewards>
      <StakeButton>{button}</StakeButton>
    </StakeWrapper>
  )
}

const StakeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${props => props.theme.color.white};
`

const StakeLogo = styled.img`
  margin: 0 ${props => props.theme.spacing[2]}px;
  width: 80%;
  height: auto;
`

const StakeTitle = styled.div`
  font-size: 14px;
  text-algn: center;
  margin-top: ${props => props.theme.spacing[3]}px;
  margin-bottom: ${props => props.theme.spacing[3]}px;
`

const StakeTitle1 = styled.div`
  font-size: 14px;
  text-algn: center;
  margin-top: ${props => props.theme.spacing[3]}px;
`

const StakeTitle2 = styled.div`
  font-size: 14px;
  text-algn: center;
  margin-bottom: ${props => props.theme.spacing[3]}px;
`

const StakeRewards = styled.h3`
  text-algn: center;
  margin: 0;
  color: ${props => props.theme.color.gold};
`

const StakeButton = styled.div`
  margin-top: ${props => props.theme.spacing[3]}px;
  margin-bottom: ${props => props.theme.spacing[3]}px;
`