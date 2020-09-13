import { useCallback } from 'react'

import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from "web3-eth-contract"

import { approve } from '../utils/erc20'
import useTransactionAdder from './useTransactionAdder';

const useApprove = (tokenContract: Contract, poolContract: Contract, tokenName: string) => {
  const { account }: { account: string, ethereum: provider } = useWallet()
  const { onAddTransaction } = useTransactionAdder();

  const handleApprove = useCallback(async () => {
    try {
      const hash = await approve(tokenContract, poolContract, account);
      onAddTransaction({
        hash,
        description: `Approve ${tokenName} allowance`,
      });
      return hash;
    } catch (e) {
      console.error(e.stack);
      return false
    }
  }, [account, tokenContract, poolContract])

  return { onApprove: handleApprove }
}

export default useApprove