import { useCallback, useEffect, useState } from 'react';
import useBasisCash from '../useBasisCash';
import { TokenStat } from '../../basis-cash/types';

const useCashStats = () => {
  const [stat, setStat] = useState<TokenStat>();
  const basisCash = useBasisCash();

  const fetchCashPrice = useCallback(async () => {
    setStat(await basisCash.getCashStat());
  }, [basisCash]);

  useEffect(() => {
    fetchCashPrice().catch((err) => console.error(`Failed to fetch BAB price: ${err.stack}`));
    const refreshInterval = setInterval(fetchCashPrice, 10000);
    return () => clearInterval(refreshInterval);
  }, [setStat, basisCash]);

  return stat;
};

export default useCashStats;
