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
          <StyledLink href="https://app.sushi.com/pair/0xf9fF921E63B525A73dD3cF57463da53138358A49" target="_blank">Get MIS2</StyledLink>
          <StyledLink href="https://crv.finance/swap" target="_blank">Get MIC2</StyledLink>
        </StyledLinkGroup>
        <StyledLinkGroup>
          <StyledLinkGroupName>Follow Us</StyledLinkGroupName>
          <StyledLink href="https://github.com/mithio" target="_blank">GitHub</StyledLink>
          <StyledLink href="https://twitter.com/mithcash" target="_blank">Twitter</StyledLink>
          <StyledLink href="https://t.me/mithcash" target="_blank">Telegram</StyledLink>
          <StyledLink href="https://discord.gg/EacqCKujT7" target="_blank">Discord</StyledLink>
          <StyledLink href="https://medium.com/mith-cash" target="_blank">Medium</StyledLink>
          <StyledLink href="https://mithcash.substack.com/p/end-of-the-week-2" target="_blank">Newsletter</StyledLink>
          <StyledLink href="https://mithcash.xyz/" target="_blank">Forum</StyledLink>
        </StyledLinkGroup>
        <StyledLinkGroup>
          <StyledLinkGroupName>Rules</StyledLinkGroupName>
          <StyledLink href="https://sauron.gitbook.io/mith-cash" target="_blank">Docs</StyledLink>
          <StyledLink href="/Cybersecurity-report-Mith-Cash-CTDSec.pdf" target="_blank">Audit</StyledLink>
          <StyledLink href="https://snapshot.page/#/mithcash.eth" target="_blank">Governance</StyledLink>
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
  display: flex;
  width: 100%;
  margin-top: 33px;
`

const StyledLinkGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
`

const StyledLinkGroup = styled.div`
  display: flex;
  padding-bottom: 36px;
  }
`

const StyledLinkGroupName = styled.div`
  color: #8D8F9B;
  white-space: nowrap;
  min-width: 110px;
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
