import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import useBasisCash from './useBasisCash';
import config from '../config';

const useEpochEarningsOnBoardroom = (epoch: number) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const basisCash = useBasisCash();

  const fetchBalance = useCallback(async () => {
    setBalance(await basisCash.getEpochEarningsOnBoardroom(epoch));
  }, [basisCash?.isUnlocked]);

  useEffect(() => {
    if (basisCash?.isUnlocked) {
      fetchBalance().catch((err) => console.error(err.stack));

      const refreshBalance = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshBalance);
    }
  }, [basisCash?.isUnlocked, setBalance]);

  return balance;
};

export default useEpochEarningsOnBoardroom;
