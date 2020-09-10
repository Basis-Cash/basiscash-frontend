import { useContext } from 'react';
import { Context as BanksContext } from '../contexts/Banks';
import { Bank } from '../basis-cash';

const useBank = (id: string): Bank => {
  const { banks } = useContext(BanksContext);
  return banks.find((bank) => bank.id === id);
};

export default useBank;
