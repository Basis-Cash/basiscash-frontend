import React from 'react'
import styled from 'styled-components'

import Nav from './components/Nav'
import Container from '../Container';

const Footer: React.FC = () => (
  <StyledFooter>
    <StyleHr>
      <Container size="lg">
        <StyledFooterInner>
          <Nav />
        </StyledFooterInner>
      </Container>
    </StyleHr>
  </StyledFooter>
)

const StyleHr = styled.div`
  border-top: 1px solid #414244;
  box-sizing: border-box;
  margin-top: 20px;
`

const StyledFooter = styled.footer`
  align-items: center;
  justify-content: center;
`
const StyledFooterInner = styled.div`
`

export default Footer
