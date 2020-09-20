import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useWallet } from 'use-wallet';
import useDebounce from '../../hooks/useDebounce';
import useIsWindowVisible from '../../hooks/useIsWindowVisible';
import { updateBlockNumber } from './actions';
import { ethers } from 'ethers';

export default function Updater(): null {
  const { ethereum, chainId } = useWallet();

  const dispatch = useDispatch();

  const windowVisible = useIsWindowVisible();

  const [state, setState] = useState<{
    chainId: number | undefined;
    blockNumber: number | null;
  }>({
    chainId,
    blockNumber: null,
  });

  const blockNumberCallback = useCallback(
    (blockNumber: number) => {
      setState((state) => {
        if (chainId === state.chainId) {
          if (typeof state.blockNumber !== 'number') return { chainId, blockNumber };
          return { chainId, blockNumber: Math.max(blockNumber, state.blockNumber) };
        }
        return state;
      });
    },
    [chainId, setState],
  );

  // attach/detach listeners
  useEffect(() => {
    if (!ethereum || !chainId || !windowVisible) return undefined;
    setState({ chainId, blockNumber: null });

    const provider = new ethers.providers.Web3Provider(ethereum);
    provider
      .getBlockNumber()
      .then(blockNumberCallback)
      .catch((error) =>
        console.error(`Failed to get block number for chainId: ${chainId}`, error),
      );

    provider.on('block', blockNumberCallback)
    return () => provider.removeListener('block', blockNumberCallback);
  }, [dispatch, chainId, ethereum, blockNumberCallback, windowVisible]);

  const debouncedState = useDebounce(state, 100);

  useEffect(() => {
    if (!debouncedState.chainId || !debouncedState.blockNumber || !windowVisible) return;
    dispatch(
      updateBlockNumber({
        chainId: debouncedState.chainId,
        blockNumber: debouncedState.blockNumber,
      }),
    );
  }, [windowVisible, dispatch, debouncedState.blockNumber, debouncedState.chainId]);

  return null;
}
