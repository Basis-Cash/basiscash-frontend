import { useCallback, useEffect, useState } from 'react';
import { useWallet } from 'use-wallet';
import { provider } from 'web3-core';
import { BigNumber, Contract } from 'ethers';

const useAllowance = (tokenContract: Contract, poolContract: Contract) => {
  const [allowance, setAllowance] = useState(BigNumber.from(0));
  const { account }: { account: string; ethereum: provider } = useWallet();

  const fetchAllowance = useCallback(async () => {
    const allowance = await tokenContract.allowance(account, poolContract.address);
    setAllowance(allowance);
  }, [account, poolContract, tokenContract]);

  useEffect(() => {
    if (account && poolContract && tokenContract) {
      fetchAllowance().catch((err) => console.log(`Failed to fetch allowance: ${err.stack}`));
    }
    let refreshInterval = setInterval(fetchAllowance, 10000);
    return () => clearInterval(refreshInterval);
  }, [account, poolContract, tokenContract]);

  return allowance;
};

export default useAllowance;
