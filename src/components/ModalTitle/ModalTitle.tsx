import React from 'react'
import styled from 'styled-components'

interface ModalTitleProps {
  text?: string
}

const ModalTitle: React.FC<ModalTitleProps> = ({ text }) => (
  <StyledModalTitle>
    {text}
  </StyledModalTitle>
)

const StyledModalTitle = styled.div`
  align-items: center;
  color: ${props => props.theme.color.white};
  display: flex;
  font-size: 36px;
  font-weight: 700;
  height: ${props => props.theme.topBarSize}px;
  justify-content: center;
  margin-top: ${props => -props.theme.spacing[4]}px;
`

export default ModalTitle
