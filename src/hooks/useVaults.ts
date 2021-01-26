import { useContext } from 'react';
import { Context as VaultsContext } from '../contexts/Vaults';

const useVaults = () => {
  const { vaults } = useContext(VaultsContext);
  return [vaults];
};

export default useVaults;
