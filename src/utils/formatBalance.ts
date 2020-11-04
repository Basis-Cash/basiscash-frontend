import { BigNumber } from 'ethers';

export const getDisplayBalance = (balance: BigNumber, decimals = 18) => {
  const number = balance.div(BigNumber.from(10).pow(decimals - 3)).toNumber();
  return (number / 10 ** 3).toFixed(3);
}

export const getFullDisplayBalance = (balance: BigNumber, decimals = 18) => {
  return getDisplayBalance(balance, decimals);
}
