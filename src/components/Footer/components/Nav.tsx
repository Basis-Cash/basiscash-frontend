import React from 'react'
import styled from 'styled-components'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLink href="https://github.com/Adept-Camp/JAM-protocol" target="_blank">GitHub</StyledLink>
      <StyledLink href="https://twitter.com/AdeptCamp" target="_blank">Twitter</StyledLink>
      <StyledLink href="https://t.me/adeptCamp" target="_blank">Telegram</StyledLink>
      <StyledLink href="https://t.co/N9jXPN8oJy?amp=1" target="_blank">Discord</StyledLink>
      <StyledLink href="https://adept.camp/medium/" target="_blank">Medium</StyledLink>
      <StyledLink href="https://docs.jam.cash" target="_blank">Docs</StyledLink>
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