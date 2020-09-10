import { useContext } from 'react';
import { Context } from '../contexts/BasisCashProvider';

const useBasisCash = () => {
  const { basisCash } = useContext(Context);
  return basisCash;
};

export default useBasisCash;
