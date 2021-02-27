import { useCallback, useEffect, useState } from 'react';
import useBasisCash from './useBasisCash';
import { TokenStat } from '../basis-cash/types';
import config from '../config';

const useCashStats = () => {
  const [stat, setStat] = useState<TokenStat>();
  const basisCash = useBasisCash();

  const fetchCashPrice = useCallback(async () => {
    setStat(await basisCash.getCashStatFrom3CrvPool());
  }, [basisCash]);

  useEffect(() => {
    fetchCashPrice().catch((err) => console.error(`Failed to fetch MIC2 price: ${err.stack}`));
    const refreshInterval = setInterval(fetchCashPrice, config.refreshInterval);
    return () => clearInterval(refreshInterval);
  }, [setStat, basisCash]);

  return stat;
};

export default useCashStats;
