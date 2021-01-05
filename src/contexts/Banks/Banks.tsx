import React, { useCallback, useEffect, useState } from 'react';
import Context from './context';
import useBasisCash from '../../hooks/useBasisCash';
import { Bank } from '../../basis-cash';
import config, { bankDefinitions } from '../../config';

const Banks: React.FC = ({ children }) => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const basisCash = useBasisCash();

  const fetchPools = useCallback(async () => {
    const banks: Bank[] = [];

    for (const bankInfo of Object.values(bankDefinitions)) {
      console.log("==============basisCash=============")
      console.log(basisCash)
      console.log("===================================")

      if (bankInfo.finished) {
        if (!basisCash.isUnlocked) continue;

        // only show pools staked by user
        console.log("==============balance=============")
        console.log(bankInfo)
        console.log("===================================")
        const balance = await basisCash.stakedBalanceOnBank(bankInfo.contract, basisCash.myAccount);

        if (balance.lte(0)) {
          continue;
        }
      }
      banks.push({
        ...bankInfo,
        address: config.deployments[bankInfo.contract].address,
        depositToken: basisCash.externalTokens[bankInfo.depositTokenName],
        earnToken: bankInfo.earnTokenName == 'JAM' ? basisCash.JAM : basisCash.JAZZ,
      });
    }
    banks.sort((a, b) => (a.sort > b.sort ? 1 : -1));
    setBanks(banks);
  }, [basisCash, basisCash?.isUnlocked, setBanks]);

  useEffect(() => {
    if (basisCash) {
      fetchPools()
        .catch(err => console.error(`Failed to fetch pools: ${err.stack}`));
    }
  }, [basisCash, basisCash?.isUnlocked, fetchPools]);

  return <Context.Provider value={{ banks }}>{children}</Context.Provider>;
};

export default Banks;
