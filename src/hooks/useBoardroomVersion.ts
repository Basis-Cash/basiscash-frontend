import { useCallback, useEffect, useState } from 'react';
import useBasisCash from './useBasisCash';
import useStakedBalanceOnBoardroom from './useStakedBalanceOnBoardroom';

const useBoardroomVersion = () => {
  const [boardroomVersion, setBoardroomVersion] = useState('latest');
  const basisCash = useBasisCash();
  const stakedBalance = useStakedBalanceOnBoardroom();

  const updateState = useCallback(async () => {
    setBoardroomVersion(await basisCash.fetchBoardroomVersionOfUser());
  }, [basisCash?.isUnlocked, stakedBalance]);

  useEffect(() => {
    if (basisCash?.isUnlocked) {
      updateState().catch((err) => console.error(err.stack));
    }
  }, [basisCash?.isUnlocked, stakedBalance]);

  return boardroomVersion;
};

export default useBoardroomVersion;
