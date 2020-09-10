import { useContext } from 'react';
import { Context as BanksContext, Bank } from '../contexts/Banks';

const useBank = (id: string): Bank => {
  const { banks } = useContext(BanksContext);
  return banks.find((bank) => bank.id === id);
};

export default useBank;
