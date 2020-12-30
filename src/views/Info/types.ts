import { ShareMetric, TokenStat } from '../../basis-cash/types';

export interface OverviewData {
  cash?: TokenStat;
  bond?: TokenStat;
  share?: TokenStat;
  shareMetric?: ShareMetric;
}

export interface ShareDistStats {
  boardroomPct: string;
  USDTMISPoolPct: string;
  unstakedPct: string;
}
