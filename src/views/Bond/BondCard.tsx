import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'

import Button from '../../components/Button'
import Card from '../../components/Card'
import CardContent from '../../components/CardContent'
import CardIcon from '../../components/CardIcon'
import Loader from '../../components/Loader'

import useFarms from '../../hooks/useFarms'
import { Farm } from '../../contexts/Farms'
import Input from '../../components/Input'

const BondCard: React.FC = () => {

  return (
    <Card>
      <CardContent>
        <InputGroup>
          <InputText>from</InputText>
          <InputControl>
            <Input />
            <div>
              Basis Cash
            </div>
          </InputControl>
        </InputGroup>

        <div>
          <span>dasf</span>
          <OptionText>+ add a send (optional)</OptionText>
        </div>

        <InputGroup>
          <InputText>to</InputText>
          <InputControl>
            <Input />
            <Button variant='secondary'>Basis Bond</Button>
          </InputControl>
        </InputGroup>

        <div>Price</div>

        <Button>Swap</Button>
      </CardContent>
    </Card>
  )
}

const InputGroup = styled.div`
  border-radius: ${props => props.theme.borderRadius}px;
  display: flex;
  background-color: ${props => props.theme.color.grey[200]};
  flex-direction: column;
  width: 100%;
  padding: 0 ${props => props.theme.spacing[2]}px;
  margin-bottom: ${props => props.theme.spacing[4]}px;
`;

const InputControl = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const InputText = styled.h2`
  color: ${props => props.theme.color.grey[800]};
  margin: 0;
`

const OptionText = styled.p`
  margin: 0;
  color: ${props => props.theme.color.secondary.main};
`

const StyledContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

export default BondCard
