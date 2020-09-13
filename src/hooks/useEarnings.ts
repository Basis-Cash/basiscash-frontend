import { useCallback, useEffect, useState } from 'react';

import BigNumber from 'bignumber.js';
import { useWallet } from 'use-wallet';
import { Contract } from 'web3-eth-contract';
import useBasisCash from './useBasisCash';

const useEarnings = (pool: Contract) => {
  const [balance, setBalance] = useState(new BigNumber(0));
  const { account } = useWallet();
  const basisCash = useBasisCash();

  const fetchBalance = useCallback(async () => {
    const balance = await basisCash.earnedFromBank(pool);
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

export default useEarnings;
