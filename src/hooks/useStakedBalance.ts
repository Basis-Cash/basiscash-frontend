import { useCallback, useEffect, useState } from 'react';

import { BigNumber } from 'ethers';
import useBasisCash from './useBasisCash';
import { ContractName } from '../basis-cash';
import config from '../config';

const useStakedBalance = (poolName: ContractName) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const basisCash = useBasisCash();

  const fetchBalance = useCallback(async () => {
    const balance = await basisCash.stakedBalanceOnBank(poolName, basisCash.myAccount);
    setBalance(balance);
  }, [basisCash?.isUnlocked, poolName]);

  useEffect(() => {
    if (basisCash?.isUnlocked) {
      fetchBalance().catch(err => console.error(err.stack));

      const refreshBalance = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshBalance);
    }
  }, [basisCash?.isUnlocked, poolName, setBalance, basisCash]);

  return balance;
};

export default useStakedBalance;
