import { useCallback, useEffect, useState } from 'react';

import { useWallet } from 'use-wallet';
import { BigNumber, Contract } from 'ethers';
import useBasisCash from './useBasisCash';

const useStakedBalance = (pool: Contract) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const { account } = useWallet();
  const basisCash = useBasisCash();

  const fetchBalance = useCallback(async () => {
    const balance = await basisCash.stakedBalanceOnBank(pool, account);
    setBalance(balance);
  }, [account, pool]);

  useEffect(() => {
    if (account && pool && basisCash) {
      fetchBalance()
        .catch(err => console.error(err.stack));
    }
  }, [account, pool, setBalance, basisCash]);

  return balance;
};

export default useStakedBalance;
