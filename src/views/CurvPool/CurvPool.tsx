import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import Page from '../../components/Page';
import useBasisCash from '../../hooks/useBasisCash';

import TokenInput from '../../components/TokenInput';
import useTokenBalance from '../../hooks/useTokenBalance';
import Button from '../../components/Button';
import { getDisplayBalance } from '../../utils/formatBalance';
import useApprove, { ApprovalState } from '../../hooks/useApprove';
import { useWallet } from 'use-wallet';
import useCurvDeposit from '../../hooks/useCurvDeposit';

const CurvDepositor = '0xA79828DF1850E8a3A3064576f380D90aECDD3359';

const CurvPool: React.FC = () => {
  const { account } = useWallet();

  const basisCash = useBasisCash();

  const mic2Balance = useTokenBalance(basisCash.MIC2);
  const usdtBalance = useTokenBalance(basisCash.USDT);

  const [mic2Val, setMic2Val] = useState('')
  const handleMic2Change = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    setMic2Val(e.currentTarget.value)
  }, [setMic2Val])

  const [usdtVal, setUsdtVal] = useState('')
  const handleUsdtChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    setUsdtVal(e.currentTarget.value)
  }, [setUsdtVal])

  const mic2FullBalance = useMemo(() => {
    return getDisplayBalance(mic2Balance, 18, 6)
  }, [mic2Balance])

  const usdtFullBalance = useMemo(() => {
    return getDisplayBalance(usdtBalance, 6, 6)
  }, [usdtBalance])

  const handleSelectMic2Max = useCallback(() => {
    setMic2Val(mic2FullBalance)
  }, [mic2FullBalance, setMic2Val])

  const handleSelectUsdtMax = useCallback(() => {
    setUsdtVal(usdtFullBalance)
  }, [usdtFullBalance, setUsdtVal])

  const [mic2ApproveStatus, approveMic2] = useApprove(basisCash.MIC2, basisCash.curvDepositor.address);
  const [usdtApproveStatus, approveUsdt] = useApprove(basisCash.USDT, basisCash.curvDepositor.address);

  const depositReady = useMemo(() => {
    return mic2ApproveStatus === ApprovalState.APPROVED // todo
      && usdtApproveStatus === ApprovalState.APPROVED
      && mic2Val !== ''
      && usdtVal !== ''
  }, [mic2ApproveStatus, usdtApproveStatus, mic2Val, usdtVal]);

  const { onDeposit } = useCurvDeposit();

  return (
    <Page>
      {!!account ? (
        <Card>
          <CardTitle>MIC2-3CRV Pool</CardTitle>
          <TokenInput
            max={mic2FullBalance}
            symbol='MIC2'
            onChange={handleMic2Change}
            onSelectMax={handleSelectMic2Max}
            value={mic2Val} />
          <TokenInput
            max={usdtFullBalance}
            symbol='USDT'
            onChange={handleUsdtChange}
            onSelectMax={handleSelectUsdtMax}
            value={usdtVal} />

          {mic2ApproveStatus !== ApprovalState.APPROVED && (
            <ButtonWrapper>
              <Button text='Approve MIC2' onClick={approveMic2} />
            </ButtonWrapper>
          )}
          {usdtApproveStatus !== ApprovalState.APPROVED && (
            <ButtonWrapper>
              <Button text='Approve USDT' onClick={approveUsdt} />
            </ButtonWrapper>
          )}
          <ButtonWrapper>
            <Button text='Add Liquidity' disabled={!depositReady} onClick={() => onDeposit(mic2Val, usdtVal)} />
          </ButtonWrapper>
          <Link href="https://crv.finance/liquidity">Remove Liquidity on crv.finance</Link>
        </Card>
      ) : (
        <UnlockWallet />
      )}
    </Page>
  );
};

const UnlockWallet = () => {
  const { connect } = useWallet();
  return (
    <Center>
      <Button onClick={() => connect('injected')} text="Unlock Wallet" />
    </Center>
  );
};

const Center = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Link = styled.a`
  padding-top: ${props => props.theme.spacing[4]}px;
  color: white;
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #426687;
  border-radius: 20px;
  padding: ${props => props.theme.spacing[4]}px;
`

const CardTitle = styled.div`
  color: white;
  font-size: 22px;
  font-weight: 700;
`

const ButtonWrapper = styled.div`
  padding-top: ${props => props.theme.spacing[4]}px;
`

export default CurvPool;
