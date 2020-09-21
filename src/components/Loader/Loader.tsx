import React from 'react'
import styled from 'styled-components'

import CardIcon from '../CardIcon'
import TokenSymbol from '../TokenSymbol';

interface LoaderProps {
  text?: string
}

const Loader: React.FC<LoaderProps> = ({ text }) => {
  return (
    <StyledLoader>
      <CardIcon>
        <TokenSymbol symbol="BAC" size={36} />
      </CardIcon>
      {!!text && <StyledText>{text}</StyledText>}
    </StyledLoader>
  )
}

const StyledLoader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const StyledText = styled.div`
  color: ${props => props.theme.color.grey[400]};
`

export default Loader