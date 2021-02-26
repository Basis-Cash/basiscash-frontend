import React, { createContext, useEffect, useState } from 'react';
import { useWallet } from 'use-wallet';
import BasisCash from '../../basis-cash';
import config from '../../config';

export interface BasisCashContext {
  basisCash?: BasisCash;
}

export const Context = createContext<BasisCashContext>({ basisCash: null });

export const BasisCashProvider: React.FC = ({ children }) => {
  const basis = new BasisCash(config);

  const { ethereum, account } = useWallet();
  const [basisCash, setBasisCash] = useState<BasisCash>(basis);

  useEffect(() => {
    if (account) {
      basisCash.unlockWallet(ethereum, account);
    }
  }, [account]);

  return <Context.Provider value={{ basisCash }}>{children}</Context.Provider>;
};
