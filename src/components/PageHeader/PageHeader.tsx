import React from 'react'
import styled from 'styled-components'

import handUp from '../../assets/img/hand-up.svg'
import handDown from '../../assets/img/hand-down.svg'

interface PageHeaderProps {
  subtitle?: string,
  title?: string,
}

const PageHeader: React.FC<PageHeaderProps> = ({ subtitle, title }) => {
  return (
    <StyledPageHeader>
      <StyledMagicHand src={handDown}/>
      <StyledPageTitle>
        <StyledTitle>{title}</StyledTitle>
        <StyledSubtitle>{subtitle}</StyledSubtitle>
      </StyledPageTitle>
      <StyledMagicHand src={handUp}/>
    </StyledPageHeader>
  )
}

const StyledPageHeader = styled.div`
  display: flex;
`

const StyledMagicHand = styled.img`
  padding-left: ${props => props.theme.spacing[4]}px;
  padding-right: ${props => props.theme.spacing[4]}px;
`

const StyledPageTitle = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding-bottom: ${props => props.theme.spacing[6]}px;
  padding-top: ${props => props.theme.spacing[6]}px;
  width: 100%;
  margin: 0 auto;
  white-space: nowrap;
`

const StyledIcon = styled.div`
  font-size: 96px;
  height: 96px;
  line-height: 96px;
  text-align: center;
  width: 96px;
`

const StyledTitle = styled.h1`
  color: ${props => props.theme.color.gold};
  font-size: 36px;
  font-weight: 700;
  margin: 0;
  padding: 0;
`

const StyledSubtitle = styled.h3`
  color: ${props => props.theme.color.gold};
  font-size: 18px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
`

export default PageHeader
