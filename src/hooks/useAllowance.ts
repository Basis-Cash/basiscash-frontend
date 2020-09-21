import { useCallback, useEffect, useState } from 'react';
import { useWallet } from 'use-wallet';
import { provider } from 'web3-core';
import { BigNumber } from 'ethers';
import ERC20 from '../basis-cash/ERC20';

const useAllowance = (token: ERC20, spender: string) => {
  const [allowance, setAllowance] = useState(BigNumber.from(0));
  const { account }: { account: string; ethereum: provider } = useWallet();

  const fetchAllowance = useCallback(async () => {
    const allowance = await token.allowance(account, spender);
    setAllowance(allowance);
  }, [account, spender, token]);

  useEffect(() => {
    if (account && spender && token) {
      fetchAllowance().catch((err) => console.log(`Failed to fetch allowance: ${err.stack}`));
    }
    let refreshInterval = setInterval(fetchAllowance, 10000);
    return () => clearInterval(refreshInterval);
  }, [account, spender, token]);

  return allowance;
};

export default useAllowance;
