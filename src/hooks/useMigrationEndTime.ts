import { useEffect, useState } from 'react';

import useBasisCash from './useBasisCash';
import { ContractName } from '../basis-cash';

const useMigrationEndTime = (contractName: ContractName) => {
  const [time, setTime] = useState<Date | null>(new Date());
  const basisCash = useBasisCash();

  useEffect(() => {
    basisCash.getMigrationEndTime(contractName).then(setTime);
  }, [basisCash]);

  return time;
};

export default useMigrationEndTime;
