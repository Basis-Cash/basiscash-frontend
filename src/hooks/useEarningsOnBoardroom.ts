import { useCallback, useEffect, useState } from 'react';
import { useWallet } from 'use-wallet';
import { BigNumber } from 'ethers';
import useBasisCash from './useBasisCash';

const useEarningsOnBoardroom = () => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const { account } = useWallet();
  const basisCash = useBasisCash();

  const fetchBalance = useCallback(async () => {
    setBalance(await basisCash.getEarningsOnBoardroom());
  }, [account, basisCash]);

  useEffect(() => {
    if (account && basisCash) {
      fetchBalance().catch((err) => console.error(err.stack));
    }
  }, [account, setBalance, basisCash]);

  return balance;
};

export default useEarningsOnBoardroom;
