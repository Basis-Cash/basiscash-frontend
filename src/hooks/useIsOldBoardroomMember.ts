import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import useBasisCash from './useBasisCash';
import config from '../config';

const useIsOldBoardroomMember = () => {
  const [isOldBoardroomMember, setIsOldBoardroomMember] = useState(false);
  const basisCash = useBasisCash();

  const updateState = useCallback(async () => {
    setIsOldBoardroomMember(await basisCash.isOldBoardroomMember());
  }, [basisCash?.isUnlocked]);

  useEffect(() => {
    if (basisCash?.isUnlocked) {
      updateState().catch((err) => console.error(err.stack));
    }
  }, [basisCash?.isUnlocked, setIsOldBoardroomMember]);

  return isOldBoardroomMember;
};

export default useIsOldBoardroomMember;
