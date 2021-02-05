import React, { useMemo } from 'react';
import styled from 'styled-components';
import useCashPriceInEstimatedTWAP from '../../../hooks/useCashPriceInEstimatedTWAP';
import useBondStats from '../../../hooks/useBondStats';

const Phase: React.FC = () => {
  const cashStat = useCashPriceInEstimatedTWAP();
  const isExpansion = useMemo(() => Number(cashStat?.priceInUSDT) > 1.01, [cashStat]);

  const bondStat = useBondStats();
  const isContraction = useMemo(() => Number(bondStat?.priceInUSDT) < 1.0, [bondStat]);


  let phase: string;
  if (isExpansion && isContraction) {
    phase = 'Expansion & Contraction';
  } else if (isExpansion) {
    phase = 'Expansion';
  } else {
    phase = 'Contraction';
  }

  return (
    <Wrapper>
      <div>
        Currently, <br />
        <GoldSpan>{phase}</GoldSpan>
        <WhiteSpan> Phase is Active.</WhiteSpan>
      </div>
      {isExpansion && isContraction ? (
        <>
          <PhaseDescription>
            You can buy MITH Shares (MIS) with USDT, and stake into boardroom to earn rewards
            from MIC seigniorage. You can also buy MITH Bonds (MIB) with MITH Cash (MIC), and
            redeem MIB for a premium when MIC price is above peg threshold (currently 1.01).
          </PhaseDescription>
        </>
      ) : isExpansion ? (
        <PhaseDescription>
          You can buy MITH Shares (MIS) with USDT, and stake into boardroom to earn rewards
          from MIC seigniorage.
        </PhaseDescription>
      ) : (
        <PhaseDescription>
          You can buy MITH Bonds (MIB) with MITH Cash (MIC), and redeem MIB for a premium when
          MIC price is above peg threshold (currently 1.01).
        </PhaseDescription>
      )}
    </Wrapper>
  )
};

const Wrapper = styled.div`
  color: ${props => props.theme.color.grey[500]};
  margin-bottom: ${props => props.theme.spacing[6]}px;
`

const GoldSpan = styled.span`
  color: ${props => props.theme.color.gold};
  font-size: 32px;
`

const WhiteSpan = styled.span`
  color: ${props => props.theme.color.white};
  font-size: 32px;
`

const PhaseDescription = styled.div`
  max-width: 70%;
  @media (max-width: 768px) {
    max-width: unset;
  }
`

export default Phase
