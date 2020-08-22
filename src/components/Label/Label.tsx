import React from 'react'
import styled from 'styled-components'

interface LabelProps {
  text?: string,
}

const Label: React.FC<LabelProps> = ({ text }) => (
  <StyledLabel>{text}</StyledLabel>
)

const StyledLabel = styled.div`
  color: ${props => props.theme.color.secondary.main};
`

export default Label