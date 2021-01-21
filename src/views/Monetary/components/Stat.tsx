import React from 'react';
import styled from 'styled-components';
import Card from '../../../components/Card';

interface StatProps {
  title: string;
  description: string;
}

const Stat: React.FC<StatProps> = ({ title, description }) => {
  return (
    <Card>
      <StyledCardContentInner>
        <StyledCardTitle>{title}</StyledCardTitle>
        <StyledDesc>{description}</StyledDesc>
      </StyledCardContentInner>
    </Card>
  );
};

const StyledCardTitle = styled.div`
  color: ${(props) => props.theme.color.white};
  font-size: 36px;
  font-weight: 700;
`;

const StyledDesc = styled.span`
  color: ${(props) => props.theme.color.grey[400]};
`;

const StyledCardContentInner = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: ${(props) => props.theme.spacing[2]}px ${(props) => props.theme.spacing[4]}px;
`;

export default Stat;
