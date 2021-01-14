import React from 'react'
import styled from 'styled-components'

import mithCash from '../../../assets/img/mithCash.svg';

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLogo src={mithCash} />
      <StyledLinkGroupWrapper>
        <StyledLinkGroup>
          <StyledLinkGroupName>Tokens</StyledLinkGroupName>
          <StyledLink href="https://sushiswap.fi/pair/0x066F3A3B7C8Fa077c71B9184d862ed0A4D5cF3e0" target="_blank">Get MIS</StyledLink>
          <StyledLink href="https://sushiswap.fi/pair/0xC9cB53B48A2f3A9e75982685644c1870F1405CCb" target="_blank">Get MIC</StyledLink>
        </StyledLinkGroup>
        <StyledLinkGroup>
          <StyledLinkGroupName>Follow Us</StyledLinkGroupName>
          <StyledLink href="https://github.com/mithio" target="_blank">GitHub</StyledLink>
          <StyledLink href="https://twitter.com/mithcash" target="_blank">Twitter</StyledLink>
          <StyledLink href="https://t.me/mithcash" target="_blank">Telegram</StyledLink>
          <StyledLink href="https://discord.gg/EacqCKujT7" target="_blank">Discord</StyledLink>
          <StyledLink href="https://medium.com/mith-cash" target="_blank">Medium</StyledLink>
        </StyledLinkGroup>
        <StyledLinkGroup>
          <StyledLinkGroupName>Rules</StyledLinkGroupName>
          <StyledLink href="https://sauron.gitbook.io/mith-cash" target="_blank">Docs</StyledLink>
          <StyledLink href="./Cybersecurity-report-Mith-Cash-CTDSec.pdf" target="_blank">Audit</StyledLink>
        </StyledLinkGroup>
      </StyledLinkGroupWrapper>
    </StyledNav>
  )
}

const StyledLogo = styled.img`
  width: 30px;
  height: 30px;
`

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
  width: 100%;
`

const StyledLinkGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
`

const StyledLinkGroup = styled.div`
  display: flex;
  margin-top: 8px;
  &:first-child {
    margin-top: 0;
  }
`

const StyledLinkGroupName = styled.div`
  color: ${props => props.theme.color.grey[400]};
  flex-basis: 80px;
  white-space: nowrap;
`

const StyledLink = styled.a`
  color: ${props => props.theme.color.white};
  padding-left: ${props => props.theme.spacing[3]}px;
  padding-right: ${props => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${props => props.theme.color.grey[500]};
  }
  flex: 0 0 70px;
`

export default Nav
