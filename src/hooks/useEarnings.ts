import { useCallback, useEffect, useState } from 'react';
import { useWallet } from 'use-wallet';
import { BigNumber } from 'ethers';
import useBasisCash from './useBasisCash';
import { ContractName } from '../basis-cash';

const useEarnings = (poolName: ContractName) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const { account } = useWallet();
  const basisCash = useBasisCash();

  const fetchBalance = useCallback(async () => {
    const balance = await basisCash.earnedFromBank(poolName, account);
    setBalance(balance);
  }, [account, poolName]);

  useEffect(() => {
    if (account && poolName && basisCash) {
      fetchBalance().catch((err) => console.error(err.stack));
    }
  }, [account, poolName, setBalance, basisCash]);

  return balance;
};

export default useEarnings;
