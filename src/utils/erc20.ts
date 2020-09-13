import Web3 from 'web3'
import { provider } from 'web3-core'
import { AbiItem } from 'web3-utils'

import ERC20ABI from '../constants/abi/ERC20.json'
import { Contract } from "web3-eth-contract"
import { ethers } from 'ethers';

export const getContract = (provider: provider, address: string) => {
  const web3 = new Web3(provider)
  const contract = new web3.eth.Contract(ERC20ABI.abi as unknown as AbiItem, address)
  return contract
}

export const getAllowance = async (tokenContract: Contract, poolContract: Contract, account: string): Promise<string> => {
  try {
    const allowance: string = await tokenContract.methods.allowance(account, poolContract.options.address).call()
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
    .approve(poolContract.options.address, ethers.constants.MaxUint256.toString())
    .send({ from: account, gas: 80000 })
    .on('transactionHash', (tx: { transactionHash: string }) => {
      return tx.transactionHash;
    });
};
