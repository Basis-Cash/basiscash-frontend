import { useContext } from 'react';
import { Context as BanksContext } from '../contexts/Banks';

const useBanks = () => {
  const { banks } = useContext(BanksContext);
  return [banks];
};

export default useBanks;
