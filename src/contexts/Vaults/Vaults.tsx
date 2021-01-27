import React, { useCallback, useEffect, useState } from 'react';
import Context from './context';
import useBasisCash from '../../hooks/useBasisCash';
import { Vault } from '../../basis-cash';
import config, { vaultDefinitions } from '../../config';

const Vaults: React.FC = ({ children }) => {
  const [vaults, setVaults] = useState<Vault[]>([]);
  const basisCash = useBasisCash();

  const fetchPools = useCallback(async () => {
    const vaults: Vault[] = [];

    for (const vaultInfo of Object.values(vaultDefinitions)) {
      if (vaultInfo.finished) {
        if (!basisCash.isUnlocked) continue;

        // only show pools staked by user
        const balance = await basisCash.stakedBalanceOnBank(vaultInfo.contract, basisCash.myAccount);
        if (balance.lte(0)) {
          continue;
        }
      }
      vaults.push({
        ...vaultInfo,
        address: config.deployments[vaultInfo.contract].address,
        token: basisCash.externalTokens[vaultInfo.tokenName],
      });
    }
    vaults.sort((a, b) => (a.sort > b.sort ? 1 : -1));
    setVaults(vaults);
  }, [basisCash, basisCash?.isUnlocked, setVaults]);

  useEffect(() => {
    if (basisCash) {
      fetchPools()
        .catch(err => console.error(`Failed to fetch pools: ${err.stack}`));
    }
  }, [basisCash, basisCash?.isUnlocked, fetchPools]);

  return <Context.Provider value={{ vaults }}>{children}</Context.Provider>;
};

export default Vaults;
