import React from 'react';
import BACLogo from '../../assets/img/bac.svg';
import BadgerLogo from '../../assets/img/badger.png';
import HuobiBTCLogo from '../../assets/img/huobibtc.png';
import babLogo from '../../assets/img/icon-ebb.svg';
import basLogo from '../../assets/img/icon-ebs.svg';
import bacLogo from '../../assets/img/icon-ebtc.svg';
import RenBTCLogo from '../../assets/img/renbtc.png';
import SBTCLogo from '../../assets/img/sbtc.png';
import WBTCLogo from '../../assets/img/wbtc.png';

const logosBySymbol: { [title: string]: string } = {
  EBTC: bacLogo,
  EBB: babLogo,
  EBS: basLogo,
  'EBTC_WBTC-UNI-LPv2': bacLogo,
  'EBS_DAI-UNI-LPv2': basLogo,

  // farms
  WBTC: WBTCLogo,
  BAC: BACLogo,
  HBTC: HuobiBTCLogo,
  RenBTC: RenBTCLogo,
  SBTC: SBTCLogo,
  BADGER: BadgerLogo,
};

type BasisLogoProps = {
  symbol: string;
  size?: number;
};

const TokenSymbol: React.FC<BasisLogoProps> = ({ symbol, size = 64 }) => {
  if (!logosBySymbol[symbol]) {
    throw new Error(`Invalid BasisLogo symbol: ${symbol}`);
  }
  return <img src={logosBySymbol[symbol]} alt={`${symbol} Logo`} width={size} height={size} />;
};

export default TokenSymbol;
