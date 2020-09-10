import { Contract } from 'web3-eth-contract';

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
  depositTokenAddress: string;
  earnTokenAddress: string;
}
