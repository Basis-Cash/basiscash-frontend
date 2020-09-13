import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import Button from '../../components/Button';
import Card from '../../components/Card';
import CardContent from '../../components/CardContent';
import Input from '../../components/Input';
import useBasisCash from '../../hooks/useBasisCash';

const BondCard: React.FC = () => {
  const [amount, setAmount] = useState(0);
  const basisCash = useBasisCash();

  const handleChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    setAmount(Number(e.currentTarget.value));
  }, [setAmount]);

  const handleClick = useCallback(() => {
    basisCash
      .buyBonds(amount)
      .then(() => alert('TODO: Amazing!'))
      .catch((err) => alert(`Failed to buy bonds: ${err}`));
  }, [basisCash, amount]);

  return (
    <Card>
      <CardContent>
        <InputGroup>
          <InputText>from</InputText>
          <InputControl>
            <Input onChange={handleChange} value={`${amount}`} />
            <div>Basis Cash</div>
          </InputControl>
        </InputGroup>

        {/*<div>*/}
        {/*  <span>dasf</span>*/}
        {/*  <OptionText>+ add a send (optional)</OptionText>*/}
        {/*</div>*/}

        <InputGroup>
          <InputText>to</InputText>
          <InputControl>
            <Input onChange={() => null} value={`${amount}`} />
            <Button variant="secondary">Basis Bond</Button>
          </InputControl>
        </InputGroup>

        <div>Price</div>

        <Button onClick={handleClick}>Swap</Button>
      </CardContent>
    </Card>
  );
};

const InputGroup = styled.div`
  border-radius: ${(props) => props.theme.borderRadius}px;
  display: flex;
  background-color: ${(props) => props.theme.color.grey[200]};
  flex-direction: column;
  width: 100%;
  padding: 0 ${(props) => props.theme.spacing[2]}px;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
`;

const InputControl = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InputText = styled.h2`
  color: ${(props) => props.theme.color.grey[800]};
  margin: 0;
`;

const OptionText = styled.p`
  margin: 0;
  color: ${(props) => props.theme.color.secondary.main};
`;

const StyledContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export default BondCard;
