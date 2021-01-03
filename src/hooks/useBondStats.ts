import { useCallback, useEffect, useState } from 'react';
import { TokenStat } from '../basis-cash/types';
import config from '../config';
import useBasisCash from './useBasisCash';

const useBondStats = () => {
  const [stat, setStat] = useState<TokenStat>();
  const basisCash = useBasisCash();

  const fetchBondPrice = useCallback(async () => {
    setStat(await basisCash.getBondStat());
  }, [basisCash]);

  useEffect(() => {
    fetchBondPrice().catch((err) => console.error(`Failed to fetch EBB price: ${err.stack}`));
    const refreshInterval = setInterval(fetchBondPrice, config.refreshInterval);
    return () => clearInterval(refreshInterval);
  }, [setStat, basisCash]);

  return stat;
};

export default useBondStats;
