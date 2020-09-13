import React, { createContext, useEffect, useState } from 'react';
import { useWallet } from 'use-wallet';
import BasisCash from '../../basis-cash';
import config from '../../config';

export interface BasisCashContext {
  basisCash?: BasisCash;
}

export const Context = createContext<BasisCashContext>({ basisCash: null });

export const BasisCashProvider: React.FC = ({ children }) => {
  const { ethereum, account } = useWallet();
  const [basisCash, setBasisCash] = useState<BasisCash>();

  useEffect(() => {
    if (!basisCash) {
      const basis = new BasisCash(config);
      if (account) {
        // wallet was unlocked at initialization
        basis.unlockWallet(ethereum, account);
      }
      setBasisCash(basis);
    } else if (account) {
      basisCash.unlockWallet(ethereum, account);
    }
  }, [account]);

  return <Context.Provider value={{ basisCash }}>{children}</Context.Provider>;
};
