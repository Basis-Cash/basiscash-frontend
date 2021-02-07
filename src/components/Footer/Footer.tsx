import React from 'react'
import styled from 'styled-components'

import Nav from './components/Nav'
import Container from '../Container';

import FrameRight from '../../assets/img/Frame-right.svg';
import FrameLeft from '../../assets/img/Frame-left.svg';

const Footer: React.FC = () => (
  <StyledFooter>
    <StyleFrame>
      <img src={FrameLeft} width="349" />
      <img src={FrameRight} width="349" />
    </StyleFrame>
    <StyleHr>
      <Container size="lg">
        <StyledFooterInner>
          <Nav />
        </StyledFooterInner>
      </Container>
    </StyleHr>
  </StyledFooter>
)

const StyleFrame = styled.div`
  display: flex;
  justify-content: space-between;
`

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
