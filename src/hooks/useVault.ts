import { useContext } from 'react';
import { Context as VaultsContext } from '../contexts/Vaults';
import { Vault, ContractName } from '../basis-cash';

const useBank = (contractName: ContractName): Vault => {
  const { vaults } = useContext(VaultsContext);
  return vaults.find((vault) => vault.contract === contractName);
};

export default useBank;
