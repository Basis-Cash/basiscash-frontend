import { createContext } from 'react';
import { Bank } from '../../basis-cash';

export interface BanksContext {
  banks: Bank[];
}

const context = createContext<BanksContext>({
  banks: [],
});

export default context;
