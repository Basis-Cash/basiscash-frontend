import { AbiItem } from "web3-utils";

export type Deployments = {
  [contractName: string]: {
    address: string;
    abi: AbiItem[];
  }
}
