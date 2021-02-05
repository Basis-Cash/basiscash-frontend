import React, { useCallback, useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import { ShareDistStats, OverviewData } from './types';
import useBasisCash from '../../hooks/useBasisCash';
import config from '../../config';

import MICInfo from './components/MICInfo';
import { Section, SectionData, SectionHeader, SectionSubHeader } from './components/Section';
import Page from '../../components/Page';
import { commify } from 'ethers/lib/utils';
import useCashPriceInEstimatedTWAP from '../../hooks/useCashPriceInEstimatedTWAP';
import { ShareMetric } from '../../basis-cash/types';
import useTreasuryAllocationTimes from '../../hooks/useTreasuryAllocationTimes';
import moment from 'moment';
import ProgressCountdown from './components/ProgressCountdown';

function shareDistStatsFromMetric(metric: ShareMetric): ShareDistStats {
  const pct = (x: string, y: string): string => {
    return (Number(x) / Number(y) * 100).toFixed(2) + '%';
  };

  return {
    USDTMISPoolPct: pct(metric.USDTMISPoolBalance, metric.circulatingSupply),
    boardroomPct: pct(metric.boardroomBalance, metric.circulatingSupply),
    unstakedPct: pct(metric.unstakedBalance, metric.circulatingSupply),
  }
}

const Info: React.FC = () => {
  const basisCash = useBasisCash();

  const [{ cash, share, shareMetric }, setStats] = useState<OverviewData>({});
  const [shareDist, setShareDistStats] = useState<ShareDistStats>({
    USDTMISPoolPct: '-', boardroomPct: '-', unstakedPct: '-'
  });

  const fetchStats = useCallback(async () => {
    const [cash, bond, share, shareMetric] = await Promise.all([
      basisCash.getCashStatFromSushiSwap(),
      basisCash.getBondStat(),
      basisCash.getShareStat(),
      basisCash.getShareMetric(),
    ]);
    if (Date.now() < config.bondLaunchesAt.getTime()) {
      bond.priceInUSDT = '-';
    }
    setStats({ cash, bond, share, shareMetric });
  }, [basisCash, setStats]);

  const cashEstimatedStat = useCashPriceInEstimatedTWAP();

  useEffect(() => {
    if (basisCash) {
      fetchStats().catch((err) => console.error(err.stack));
    }
  }, [basisCash]);
  useEffect(() => {
    if (shareMetric) {
      const shareDistStats = shareDistStatsFromMetric(shareMetric);
      setShareDistStats(shareDistStats);
    }
  }, [shareMetric])

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
    <Page>
      <InfoWrapper>
        <MICInfo
          spotPrice={cash ? `$${cash.priceInUSDT} USDT` : '-'}
          twapPrice={cashEstimatedStat ? `$${cashEstimatedStat.priceInUSDT} USDT` : '-'}
          supply={cash ? commify(cash.totalSupply) : '-'}
        />
        <Section
          left={
            <>
              <SectionHeader text="Supply" />
              <SectionData title="MIS Circ. Supply" value={shareMetric ? commify(shareMetric.circulatingSupply) : '-'} />
            </>
          }
          right={
            <>
              <SectionHeader text="Price" />
              <SectionData title="MIS Price" value={share ? `$${commify(share.priceInUSDT)} USDT` : '-'} />
            </>
          }
        />
        <Section
          title="MIS Metrics"
          left={
            <>
              <SectionData title="MIS in Boardroom:" value={shareDist.boardroomPct} />
              <SectionData title="Unstaked MIS" value={shareDist.unstakedPct} />
            </>
          }
          right={
            <>
              <SectionData title="MIS in USDT/MIS Pool" value={shareDist.USDTMISPoolPct} />
              <SectionData title="Total MIS Supply" value={share ? commify(share.totalSupply) : '-'} />
            </>
          }
        />
        {/*<Section*/}
        {/*  title="SushiSwap Pool Metrics"*/}
        {/*  left={*/}
        {/*    <>*/}
        {/*      <SectionSubHeader text="MIC/USDT" />*/}
        {/*      <SectionData title="TVL:" value="62.11%" />*/}
        {/*    </>*/}
        {/*  }*/}
        {/*  right={*/}
        {/*    <>*/}
        {/*      <SectionSubHeader text="MIS/USDT" />*/}
        {/*      <SectionData title="TVL:" value="62.11%" />*/}
        {/*    </>*/}
        {/*  }*/}
        {/*/>*/}
      </InfoWrapper>
      <InfoWrapper>
        <div>Timelock Contract Queue</div>
        <div>
          ethersacn.com/abcd
          <ProgressCountdown
            base={prevEpoch}
            deadline={nextEpoch}
            description="Timeleft on timelock"
          />
        </div>
      </InfoWrapper>
    </Page>
  );
};

const InfoWrapper = styled.div`
  width: 80%;
  border-radius: 20px;
  background-color: #26272D;
  padding: ${(props) => props.theme.spacing[3]}px;
  color: ${(props) => props.theme.color.grey[200]};
  margin: ${props => props.theme.spacing[2]}px;
`;

export default Info;
