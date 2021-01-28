import ERC20 from './ERC20';

export type ContractName = string;

export interface BankInfo {
  name: string;
  contract: ContractName;
  depositTokenName: ContractName;
  earnTokenName: ContractName;
  sort: number;
  finished: boolean;
}

export interface Bank extends BankInfo {
  address: string;
  depositToken: ERC20;
  earnToken: ERC20;
}

export interface VaultInfo {
  name: string;
  contract: ContractName;
  tokenName: ContractName;
  sort: number;
  finished: boolean;
}

export interface Vault extends VaultInfo {
  address: string;
  token: ERC20;
}

export type TokenStat = {
  priceInUSDT: string;
  totalSupply: string;
};

export type TreasuryAllocationTime = {
  prevAllocation: Date;
  nextAllocation: Date;
}

export type SushiSwapPoolMISRemain = {
  USDTMICStakePoolRemain: string;
  USDTMISStakePoolRemain: string;
}

export type ShareMetric = {
  USDTMICStakePoolRemain: string;
  USDTMISStakePoolRemain: string;
  circulatingSupply: string;
  boardroomBalance: string;
  USDTMISPoolBalance: string;
  unstakedBalance: string;
}

export type APY = {
  apy?: number;
  tvl?: number;
  pricePerToken?: number;
  ratio: number;
};
