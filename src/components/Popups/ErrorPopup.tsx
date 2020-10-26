import React, { useCallback, useContext } from 'react';
import { AlertCircle, CheckCircle } from 'react-feather';
import styled, { ThemeContext } from 'styled-components';
import { AutoColumn } from '../Column';
import { AutoRow } from '../Row';
import { useWallet } from 'use-wallet';
import config from '../../config';

const RowNoFlex = styled(AutoRow)`
  flex-wrap: nowrap;
`;

export default function ErrorPopup({ message, stack }: { message: string; stack: string }) {
  const copyErrorDetails = useCallback(async () => {
    await navigator.clipboard.writeText(`${message}\n${stack}`);
  }, []);

  return (
    <RowNoFlex>
      <div style={{ paddingRight: 16 }}>
        <AlertCircle color="#FF6871" size={24} />
      </div>
      <AutoColumn gap="8px">
        <StyledPopupDesc>{message}</StyledPopupDesc>
        <StyledLink onClick={copyErrorDetails} href="#">Copy error details</StyledLink>
      </AutoColumn>
    </RowNoFlex>
  );
}

const StyledPopupDesc = styled.span`
  font-weight: 500;
  color: ${(props) => props.theme.color.grey[300]};
`;

const StyledLink = styled.a`
  color: ${(props) => props.theme.color.grey[500]};
`;
