import { useCallback, useEffect, useState } from 'react';
import useBasisCash from './useBasisCash';
import { TokenStat } from '../basis-cash/types';
import config from '../config';

const useShareStats = () => {
  const [stat, setStat] = useState<TokenStat>();
  const basisCash = useBasisCash();

  const fetchSharePrice = useCallback(async () => {
    setStat(await basisCash.getShareStat());
  }, [basisCash]);

  useEffect(() => {
    fetchSharePrice().catch((err) => console.error(`Failed to fetch MIS price: ${err.stack}`));
    const refreshInterval = setInterval(fetchSharePrice, config.refreshInterval);
    return () => clearInterval(refreshInterval);
  }, [setStat, basisCash]);

  return stat;
};

export default useShareStats;
