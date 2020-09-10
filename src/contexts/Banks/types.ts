import { Contract } from 'web3-eth-contract';

export interface Bank {
  contract: Contract;
  name: string;
  depositToken: string;
  depositTokenAddress: string;
  earnToken: string;
  earnTokenAddress: string;
  icon: React.ReactNode;
  id: string;
  sort: number;
}
