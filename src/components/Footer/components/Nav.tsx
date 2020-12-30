import React from 'react'
import styled from 'styled-components'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLink href="https://sushiswap.fi/pair/0x066F3A3B7C8Fa077c71B9184d862ed0A4D5cF3e0" target="_blank">Get MIS</StyledLink>
      <StyledLink href="https://sushiswap.fi/pair/0xC9cB53B48A2f3A9e75982685644c1870F1405CCb" target="_blank">Get MIC</StyledLink>
      <StyledLink href="https://github.com/mithio" target="_blank">GitHub</StyledLink>
      <StyledLink href="https://twitter.com/mithcash" target="_blank">Twitter</StyledLink>
      <StyledLink href="https://t.me/mithcash" target="_blank">Telegram</StyledLink>
      <StyledLink href="https://discord.gg/EacqCKujT7" target="_blank">Discord</StyledLink>
      <StyledLink href="https://medium.com/mith-cash" target="_blank">Medium</StyledLink>
      <StyledLink href="https://sauron.gitbook.io/mith-cash" target="_blank">Docs</StyledLink>
      <StyledLink href="./Cybersecurity-report-Mith-Cash-CTDSec.pdf" target="_blank">Audit</StyledLink>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`

const StyledLink = styled.a`
  color: ${props => props.theme.color.grey[400]};
  padding-left: ${props => props.theme.spacing[3]}px;
  padding-right: ${props => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${props => props.theme.color.grey[500]};
  }
`

export default Nav
