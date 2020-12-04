import { useEffect, useState } from 'react';
import useBasisCash from './useBasisCash';
import config from '../config';

const useLastTreasuryAllocationTime = () => {
  const [time, setTime] = useState<Date>(new Date());
  const basisCash = useBasisCash();

  useEffect(() => {
    if (basisCash) {
      const { Treasury } = basisCash.contracts;
      (async () => {
        const events = await Treasury.queryFilter(Treasury.filters.TreasuryFunded());
        if (events.length > 0) {
          events.sort((a, b) => (a.blockNumber > b.blockNumber ? 1 : -1));
          const latestEventBlock = await events[events.length - 1].getBlock();
          return setTime(new Date(latestEventBlock.timestamp * 1000));
        }
        // no allocations yet; leave the default value
        setTime(config.boardroomLaunchesAt);
      })();
    }
  }, [basisCash]);
  return time;
};

export default useLastTreasuryAllocationTime;
