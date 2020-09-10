import React, { createContext, useEffect, useState } from 'react';
import { useWallet } from 'use-wallet';
import BasisCash from '../../basis-cash';
import config from '../../config';

export interface BasisCashContext {
  basisCash?: BasisCash;
}

export const Context = createContext<BasisCashContext>({ basisCash: null });

export const BasisCashProvider: React.FC = ({ children }) => {
  const { ethereum } = useWallet();
  const [basisCash, setBasisCash] = useState<BasisCash>();

  useEffect(() => {
    if (!basisCash) {
      const basis = new BasisCash(config);
      if (ethereum) {
        // wallet was unlocked at initialization
        basis.injectProvider(ethereum);
      }
      setBasisCash(basis);
    } else if (ethereum) {
      basisCash.injectProvider(ethereum);
    }
    console.log('Useeffect');
  }, [ethereum]);

  return <Context.Provider value={{ basisCash }}>{children}</Context.Provider>;
};
