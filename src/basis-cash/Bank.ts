import ERC20 from './ERC20';
import { Contract } from 'ethers';

export interface BankInfo {
  name: string;
  depositTokenName: string;
  earnTokenName: string;
  icon: string;
  sort: number;
}

export type TokenInfo = {
  name: string;
  address: string;
  chainId?: number;
}

export interface Bank extends BankInfo {
  id: string;
  contract: Contract;
  depositToken: ERC20;
  earnToken: ERC20;
}
