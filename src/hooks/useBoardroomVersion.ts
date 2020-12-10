import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import useBasisCash from './useBasisCash';
import config from '../config';

const useBoardroomVersion = () => {
  const [boardroomVersion, setBoardroomVersion] = useState('latest');
  const basisCash = useBasisCash();

  const updateState = useCallback(async () => {
    setBoardroomVersion(await basisCash.fetchBoardroomVersionOfUser());
  }, [basisCash?.isUnlocked]);

  // TODO: update state after withdrawing from old boardroom
  useEffect(() => {
    if (basisCash?.isUnlocked) {
      updateState().catch((err) => console.error(err.stack));
    }
  }, [basisCash?.isUnlocked, setBoardroomVersion]);

  return boardroomVersion;
};

export default useBoardroomVersion;
