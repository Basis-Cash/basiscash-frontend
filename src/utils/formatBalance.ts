import { BigNumber } from 'ethers';
import BN from 'bignumber.js';

export const getDisplayBalance = (balance: BigNumber, decimals = 18, fractionDigits = 3) => {
  const number = getBalance(balance, decimals - fractionDigits);
  return (number / 10 ** fractionDigits).toFixed(fractionDigits);
};

export const getFullDisplayBalance = (balance: BigNumber, decimals = 18) => {
  return new BN(balance.toString()).div(10 ** decimals).toFixed(decimals);
};

export function getBalance(balance: BigNumber, decimals = 18): number {
  return balance.div(BigNumber.from(10).pow(decimals)).toNumber();
}

export const getFullBalance = (balance: BigNumber, decimals = 18) => {
  return parseFloat(getFullDisplayBalance(balance, decimals));
};
