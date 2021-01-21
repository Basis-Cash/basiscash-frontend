import React, { useCallback, useContext, useMemo } from 'react';
import styled, { ThemeContext } from 'styled-components';
import treasuryLogo from '../../../assets/img/treasury.svg';
import {
  MonetaryCardBody,
  MonetaryCardButton,
  MonetaryCardFoot,
  MonetaryCardFootCell,
  MonetaryCardHeader,
} from './MonetaryCard';
import useTreasuryAmount from '../../../hooks/useTreasuryAmount';
import Humanize from 'humanize-plus';
import { getBalance, getDisplayBalance } from '../../../utils/formatBalance';
import useBondStats from '../../../hooks/useBondStats';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useBasisCash from '../../../hooks/useBasisCash';
import useModal from '../../../hooks/useModal';
import useApprove, { ApprovalState } from '../../../hooks/useApprove';
import useCatchError from '../../../hooks/useCatchError';
import ExchangeModal from './ExchangeModal';
import useBondOraclePriceInLastTWAP from '../../../hooks/useBondOraclePriceInLastTWAP';
import { useTransactionAdder } from '../../../state/transactions/hooks';
import { BOND_REDEEM_PRICE_BN } from '../../../basis-cash/constants';

const MonetaryTreasuryCard: React.FC = () => {
  const { color } = useContext(ThemeContext);
  const treasuryAmount = useTreasuryAmount();
  const bondStat = useBondStats();
  const basisCash = useBasisCash();
  const bondBalance = useTokenBalance(basisCash?.BAB);
  const cashBalance = useTokenBalance(basisCash?.BAC);
  const cashPrice = useBondOraclePriceInLastTWAP();
  const addTransaction = useTransactionAdder();

  const isBondRedeemable = useMemo(() => cashPrice.gt(BOND_REDEEM_PRICE_BN), [cashPrice]);

  const { contracts: { Treasury } } = useBasisCash();
  const [approveStatus, approve] = useApprove(basisCash.BAC, Treasury.address);
  const catchError = useCatchError();

  const handleBuyBonds = useCallback(
    async (amount: string) => {
      const tx = await basisCash.buyBonds(amount);
      const bondAmount = Number(amount) / Number(getDisplayBalance(cashPrice));
      addTransaction(tx, {
        summary: `Buy ${bondAmount.toFixed(2)} MIB with ${amount} MIC`,
      });
    },
    [basisCash, addTransaction, cashPrice],
  );

  const handleRedeemBonds = useCallback(
    async (amount: string) => {
      const tx = await basisCash.redeemBonds(amount);
      addTransaction(tx, { summary: `Redeem ${amount} MIB` });
    },
    [basisCash, addTransaction],
  );

  const [onPresentBuyBond, onDismissBuyBond] = useModal(
    <ExchangeModal
      title='Purchase Bond'
      description=''
      max={cashBalance}
      onConfirm={(value) => {
        handleBuyBonds(value);
        onDismissBuyBond();
      }}
      action='Purchase Bond'
      tokenName='Mith Cash'
    />
  );

  const [onPresentRedeemBond, onDismissRedeemBond] = useModal(
    <ExchangeModal
      title='Redeem Bond'
      description=''
      max={cashBalance}
      onConfirm={(value) => {
        handleRedeemBonds(value);
        onDismissRedeemBond();
      }}
      action='Redeem Bond'
      tokenName='Mith Bond'
    />
  );

  return (
    <Wrapper color={color.treasury}>
      <MonetaryCardHeader
        color={color.treasury}
        icon={treasuryLogo}
        title='Treasury'
        description='MITH Bonds can be purchased with MIC to claim exponential premiums when MIC returns to peg threshold.'
      />
      <MonetaryCardBody title='Treasury Amount' value={
        treasuryAmount
          ? `~$${Humanize.intComma(getBalance(treasuryAmount))} MIC`
          : '-'
      }/>
      <MonetaryCardFoot>
        <MonetaryCardFootCell
          title='Current Bond Price'
          value={bondStat ? `$${bondStat.priceInUSDT}` : '-'}
          button={approveStatus != ApprovalState.APPROVED ? (
            <MonetaryCardButton
              text='Approve MIC'
              disabled={
                approveStatus === ApprovalState.PENDING ||
                approveStatus === ApprovalState.UNKNOWN
              }
              onClick={() => catchError(approve(), `Unable to approve MIC`)}
            />
          ) : (
            <MonetaryCardButton
              text='Buy MIB with MIC'
              disabled={!bondStat || isBondRedeemable}
              onClick={onPresentBuyBond}
            />
          )}
        />
        <MonetaryCardFootCell
          title='Your Balance'
          value={`${getDisplayBalance(bondBalance)} MIB`}
          button={
            <MonetaryCardButton
              text='Redeem MIB'
              disabled={!bondStat || bondBalance.eq(0) || !isBondRedeemable}
              onClick={onPresentRedeemBond}
            />
          }
        />
      </MonetaryCardFoot>
    </Wrapper>
  )
};

const Wrapper = styled.div`
  border: 1px solid ${props => props.color};
  color: ${props => props.theme.color.grey[500]};
  background-color: ${props => props.theme.color.oblack};
  border-radius: 20px;
`

export default MonetaryTreasuryCard
