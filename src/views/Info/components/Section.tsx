import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface SectionProp {
  title?: string;
  left: ReactElement;
  right: ReactElement;
}

export const Section: React.FC<SectionProp> = ({
  title,
  left,
  right
}) => {
  return (
    <div>
      {title && <SectionHeader text={title} />}
      <Wrapper>
        <Left>
          {left}
        </Left>
        <Right>
          {right}
        </Right>
      </Wrapper>
    </div>
  )
};

interface SectionHeaderProp {
  text: string
}

export const SectionHeader: React.FC<SectionHeaderProp> = ({
  text
}) => {
  return (
    <StyledHeader2>{text}</StyledHeader2>
  )
};

interface SectionSubHeaderProp {
  text: string
}

export const SectionSubHeader: React.FC<SectionSubHeaderProp> = ({
  text
}) => {
  return (
    <StyledHeader4>{text}</StyledHeader4>
  )
};

interface SectionDataProp {
  title: string;
  value: string;
}

export const SectionData: React.FC<SectionDataProp> = ({
  title,
  value,
}) => {
  return (
    <DataWrapper>
      <div>{title}</div>
      <div>{value}</div>
    </DataWrapper>
  )
};

const Wrapper = styled.div`
  display: flex;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const DataWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledHeader2 = styled.h2`
  margin-bottom: ${(props) => props.theme.spacing[2]}px;
  color: ${(props) => props.theme.color.gold};
`;

const StyledHeader4 = styled.h4`
  margin-top: 0;
  margin-bottom: ${(props) => props.theme.spacing[1]}px;
  color: ${(props) => props.theme.color.gold};
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 1.875rem;
  flex: 1 1 0;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1.875rem;
  flex: 1 1 0;
`;
