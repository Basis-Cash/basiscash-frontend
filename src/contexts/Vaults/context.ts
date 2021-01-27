import { createContext } from 'react';
import { Vault } from '../../basis-cash';

export interface VaultsContext {
  vaults: Vault[];
}

const context = createContext<VaultsContext>({
  vaults: [],
});

export default context;
