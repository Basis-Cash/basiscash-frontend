import React from 'react';

import bacLogo from '../../assets/img/jam.png';
import basLogo from '../../assets/img/jazz.png';
import babLogo from '../../assets/img/jab.png';
import yCRVLogo from '../../assets/img/ycrv.png';
import DAILogo from '../../assets/img/DAI.png';
import sUSDLogo from '../../assets/img/sUSD.png';
import USDCLogo from '../../assets/img/USDC.png';
import USDTLogo from '../../assets/img/USDT.png';
import ACLogo from '../../assets/img/AC.png';
import FRAXLogo from '../../assets/img/FRAX.png';

const logosBySymbol: {[title: string]: string} = {
  'JAM': bacLogo,
  'JAB': babLogo,
  'JAZZ': basLogo,
  'yCRV': yCRVLogo,
  'DAI': DAILogo,
  'SUSD': sUSDLogo,
  'USDC': USDCLogo,
  'USDT': USDTLogo,
  'AC': ACLogo,
  'FRAX': FRAXLogo,
  'JAM_DAI-UNI-LPv2': bacLogo,
  'JAM_USDC-UNI-LPv2': bacLogo,
  'JAZZ_DAI-UNI-LPv2': basLogo,
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
