import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { Bank } from '../../basis-cash';
import useCashStats from '../../hooks/useCashStats';
import useShareStats from '../../hooks/useShareStats';
import { TokenStat } from '../../basis-cash/types';
import { getDisplayBalance } from '../../utils/formatBalance';
import useEarnings from '../../hooks/useEarnings';
import useHarvest from '../../hooks/useHarvest';
import useStakedBalance from '../../hooks/useStakedBalance';
import useModal from '../../hooks/useModal';
import DepositModal from '../Bank/components/DepositModal';
import WithdrawModal from '../Bank/components/WithdrawModal';
import useTokenBalance from '../../hooks/useTokenBalance';
import useStake from '../../hooks/useStake';
import useWithdraw from '../../hooks/useWithdraw';
import useApprove, { ApprovalState } from '../../hooks/useApprove';

interface MISCardProps {
  bank: Bank;
}

const MISCard: React.FC<MISCardProps> = ({ bank }) => {
  const [approveStatus, approve] = useApprove(bank.depositToken, bank.address);

  const earnings = useEarnings(bank.contract);
  const { onReward } = useHarvest(bank);

  const cashStats = useCashStats();
  const shareStats = useShareStats();

  const tokenBalance = useTokenBalance(bank.depositToken);
  const stakedBalance = useStakedBalance(bank.contract);

  const { onStake } = useStake(bank);
  const { onWithdraw } = useWithdraw(bank);

  const [onPresentDeposit, onDismissDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      decimals={bank.depositToken.decimal}
      onConfirm={(amount) => {
        onStake(amount);
        onDismissDeposit();
      }}
      tokenName={bank.depositTokenName}
    />,
  );

  const [onPresentWithdraw, onDismissWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      decimals={bank.depositToken.decimal}
      onConfirm={(amount) => {
        onWithdraw(amount);
        onDismissWithdraw();
      }}
      tokenName={bank.depositTokenName}
    />,
  );

  let currency = '';
  let currencyStats: TokenStat;
  let purchaseLink = '';
  if (bank.depositTokenName.includes('MIS')) {
    currency = 'MIS';
    currencyStats = shareStats;
    purchaseLink = 'https://sushiswap.fi/pair/0x066F3A3B7C8Fa077c71B9184d862ed0A4D5cF3e0';
  } else if (bank.depositTokenName.includes('MIC')) {
    currency = 'MIC';
    currencyStats = cashStats;
    purchaseLink = 'https://sushiswap.fi/pair/0xC9cB53B48A2f3A9e75982685644c1870F1405CCb';
  }

  return (
    <StyledWrapper>
      <StyledContent>
        <StyledType>Sushiswap</StyledType>
        <StyledTitle>{bank.name}</StyledTitle>
        <StyledSubtitle>Earn {bank.earnTokenName}</StyledSubtitle>
        <StyledReward>
          <StyledRewardValue>{getDisplayBalance(earnings)}</StyledRewardValue>
          &nbsp;
          <StyledRewardToken>{bank.earnTokenName}</StyledRewardToken>
        </StyledReward>
        <CardButton text="Claim MIS" onClick={onReward} disabled={earnings.eq(0)} />
      </StyledContent>
      <StyledFoot>
        <StyledLeftFoot>
          <StyledFootTitle>Current {currency} Price</StyledFootTitle>
          <StyledFootValue>{
            currencyStats ? (
              `$${currencyStats.priceInUSDT}`
            ) : (
                `-`
              )}</StyledFootValue>
          <CardButton text={`Buy ${currency} with USDT`} to={purchaseLink} />
        </StyledLeftFoot>
        <StyledRightFoot>
          <StyledFootTitle>Your staked LP Balance</StyledFootTitle>
          <StyledFootValue>{getDisplayBalance(stakedBalance, bank.depositToken.decimal, 6)}</StyledFootValue>
          <StyledButtonGroup>
            {approveStatus !== ApprovalState.APPROVED ? (
              <CardButton
                size='sm'
                disabled={
                  approveStatus === ApprovalState.PENDING ||
                  approveStatus === ApprovalState.UNKNOWN
                }
                onClick={approve}
                text={`Approve ${bank.depositTokenName}`}
              />
            ) : (
                <>
                  <CardButton size='sm' text='Deposit' onClick={onPresentDeposit} disabled={tokenBalance.eq(0)} />
                  <CardButton size='sm' text='Withdraw' onClick={onPresentWithdraw} disabled={stakedBalance.eq(0)} />
                </>
              )}
          </StyledButtonGroup>
        </StyledRightFoot>
      </StyledFoot>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  border: 1px solid ${props => props.color};
  color: ${props => props.theme.color.grey[500]};
  background-color: ${props => props.theme.color.oblack};
  border-radius: 20px;
`

const StyledReward = styled.div`
  display: flex;
  align-items: baseline;
`

const StyledRewardValue = styled.div`
  font-size: 40px;
  color: ${(props) => props.theme.color.white};
`

const StyledRewardToken = styled.div`
  color: ${(props) => props.theme.color.grey[700]};
`

const StyledType = styled.h4`
  border: 1px solid ${props => props.color};
  border-radius: 20px;
  color: ${(props) => props.theme.color.grey[200]};
  margin: ${(props) => props.theme.spacing[2]}px 0 0;
  position: absolute;
  left: 10px;
  top: 27px;
`;

const StyledTitle = styled.h4`
  color: ${(props) => props.theme.color.grey[200]};
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin: ${(props) => props.theme.spacing[2]}px 0 0;
`;

const StyledSubtitle = styled.div`
  color: ${(props) => props.theme.color.grey[700]};
`;

const StyledContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
  padding: ${props => props.theme.spacing[4]}px;
  border-bottom: ${props => props.theme.color.grey[800]} 1px solid;
  position: relative;
`;

const StyledFoot = styled.div`
  display: flex;
`;

const StyledFootTitle = styled.div`
  font-size: 14px;
  color: ${props => props.theme.color.grey[700]};
`;

const StyledFootValue = styled.div`
  font-size: 40px;
  color: ${props => props.theme.color.white};
`

const StyledLeftFoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid #414244;
  padding: ${props => props.theme.spacing[4]}px;
`

const StyledRightFoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${props => props.theme.spacing[4]}px;
`

const StyledButtonGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

interface CardButtonProps {
  icon?: string;
  text: string;
  disabled?: boolean;
  onClick?: () => void;
  to?: string;
  size?: 'sm' | 'md',
}

const CardButton: React.FC<CardButtonProps> = ({
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
        <StyledLink href={to}>{text}</StyledLink>
      ) : (
          <ButtonText>{text}</ButtonText>
        )}
    </Button>
  )
}

const ButtonIcon = styled.img`
  margin-right: ${props => props.theme.spacing[3]}px;
  width: 20px;
  height: 20px;
`

const ButtonText = styled.span`
`

const StyledLink = styled.a`
  color: inherit;
  text-decoration: none;
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

export default MISCard;
