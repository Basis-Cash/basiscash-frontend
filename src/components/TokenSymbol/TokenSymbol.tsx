import React from 'react';

import bacLogo from '../../assets/img/basis-cash-logo.svg';
import micLogo from '../../assets/img/mith-cash-logo.svg';
import misLogo from '../../assets/img/mith-share-logo.svg';
import mibLogo from '../../assets/img/mith-bond-logo.svg';
import mithLogo from '../../assets/img/mith.svg';
import sUSDLogo from '../../assets/img/sUSD.png';
import yCRVLogo from '../../assets/img/ycrv.png';
import AAVELogo from '../../assets/img/aave.svg';
import BUSDLogo from '../../assets/img/busd.svg';
import COMPLogo from '../../assets/img/comp.png';
import CREAMLogo from '../../assets/img/cream.svg';
import CRVLogo from '../../assets/img/crv.png';
import DAILogo from '../../assets/img/DAI.png';
import ESDLogo from '../../assets/img/ESD.png';
import FRAXLogo from '../../assets/img/FRAX.svg';
import LINKLogo from '../../assets/img/link.svg';
import SUSHILogo from '../../assets/img/sushi.png';
import USDCLogo from '../../assets/img/USDC.png';
import USDTLogo from '../../assets/img/USDT.png';
import YFILogo from '../../assets/img/YFI.png';

const logosBySymbol: {[title: string]: string} = {
  'BAC': bacLogo,
  'yCRV': yCRVLogo,
  'DAI': DAILogo,
  'YFI': YFILogo,
  'SUSD': sUSDLogo,
  'USDC': USDCLogo,
  'USDT': USDTLogo,
  'ESD': ESDLogo,
  'MITH': mithLogo,
  'CREAM': CREAMLogo,
  'FRAX': FRAXLogo,
  'CRV': CRVLogo,
  'BUSD': BUSDLogo,
  'LINK': LINKLogo,
  'COMP': COMPLogo,
  'AAVE': AAVELogo,
  'SUSHI': SUSHILogo,
  'MIC_USDT-SUSHI-LPv2': micLogo,
  'MIS_USDT-SUSHI-LPv2': misLogo,
  'MIC': micLogo,
  'MIS': misLogo,
  'MIB': mibLogo,
};

type BasisLogoProps = {
  symbol: string;
  size?: number;
}

const TokenSymbol: React.FC<BasisLogoProps> = ({ symbol, size = 64 }) => {
  if (!logosBySymbol[symbol]) {
    throw new Error(`Invalid BasisLogo symbol: ${symbol}`);
  }
  return (
    <img
      src={logosBySymbol[symbol]}
      alt={`${symbol} Logo`}
      width={size}
      height={size}
    />
  )
};

export default TokenSymbol;
