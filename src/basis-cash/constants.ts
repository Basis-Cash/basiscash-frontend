import { BigNumber } from 'ethers';

export const DECIMALS_18 = BigNumber.from(10).pow(18);

export const BOND_REDEEM_PRICE = 1.05;
export const BOND_REDEEM_PRICE_BN = DECIMALS_18.mul(105).div(100);
