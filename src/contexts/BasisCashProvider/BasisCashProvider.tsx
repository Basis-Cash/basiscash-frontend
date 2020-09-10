import React, { createContext, useEffect, useState } from 'react'
import { useWallet } from 'use-wallet'
import { BasisCash, defaultConfiguration } from '../../basis-cash';

export interface BasisCashContext {
  basisCash?: BasisCash
}

export const Context = createContext<BasisCashContext>({ basisCash: null });

export const BasisCashProvider: React.FC = ({ children }) => {
  const { ethereum } = useWallet()
  const [basisCash, setBasisCash] = useState<BasisCash>()

  useEffect(() => {
    if (!basisCash) {
      const basis = new BasisCash(defaultConfiguration);
      if (ethereum) {
        // wallet was unlocked at initialization
        basis.injectProvider(ethereum);
      }
      setBasisCash(basis);
    } else if (ethereum) {
      basisCash.injectProvider(ethereum);
    }
  }, [ethereum])

  return (
    <Context.Provider value={{ basisCash }}>
      {children}
    </Context.Provider>
  )
}
