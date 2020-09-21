import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import { useWallet } from 'use-wallet';
import ERC20 from '../basis-cash/ERC20';

const useTokenBalance = (token: ERC20) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const { account } = useWallet();

  const fetchBalance = useCallback(async () => {
    setBalance(await token.balanceOf(account));
  }, [account, token]);

  useEffect(() => {
    if (account) {
      fetchBalance().catch((err) =>
        console.error(`Failed to fetch token balance: ${err.stack}`),
      );
      let refreshInterval = setInterval(fetchBalance, 10000);
      return () => clearInterval(refreshInterval);
    }
  }, [account, setBalance, token]);

  return balance;
};

export default useTokenBalance;
