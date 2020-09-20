import { BigNumber } from 'ethers';

export const getDisplayBalance = (balance: BigNumber, decimals = 18) => {
  const displayBalance = balance.div(BigNumber.from(10).pow(decimals))
  return displayBalance.toString()
}

export const getFullDisplayBalance = (balance: BigNumber, decimals = 18) => {
  return balance.div(BigNumber.from(10).pow(decimals)).toString();
}
