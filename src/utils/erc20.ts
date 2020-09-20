import { provider } from 'web3-core'

import ERC20ABI from '../constants/abi/ERC20.json'
import { ethers, Contract } from 'ethers';

export const getContract = (web3Provider: any, address: string): Contract => {
  const provider = new ethers.providers.Web3Provider(web3Provider);
  return new Contract(address, ERC20ABI.abi, provider);
}

export const getAllowance = async (tokenContract: Contract, poolContract: Contract, account: string): Promise<string> => {
  try {
    const allowance: string = await tokenContract.methods.allowance(account, poolContract.address).call()
    return allowance
  } catch (e) {
    return '0'
  }
}

export const getBalance = async (provider: provider, tokenAddress: string, userAddress: string): Promise<string> => {
  const tokenContract = getContract(provider, tokenAddress)
  try {
    const balance: string = await tokenContract.methods.balanceOf(userAddress).call({ from: userAddress })
    return balance
  } catch (e) {
    return '0'
  }
}

export const approve = async (tokenContract: Contract, poolContract: Contract, account: string) => {
  return tokenContract.methods
    .approve(poolContract.address, ethers.constants.MaxUint256.toString())
    .send({ from: account, gas: 80000 })
    .on('transactionHash', (tx: { transactionHash: string }) => {
      return tx.transactionHash;
    });
};
