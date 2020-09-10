import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import Label from '../../../components/Label';
import Value from '../../../components/Value';
import { TokenStat } from '../../../basis-cash/types';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

interface HomeCardProps {
  title: string;
  stat?: TokenStat;
}

const HomeCard: React.FC<HomeCardProps> = ({ title, stat }) => {
  return (
    <Wrapper>
      <CardHeader>{title}</CardHeader>
      <StyledCards>
        <CardSection>
          {stat ? <Value value={stat.priceInDAI} /> : <ValueSkeleton />}
          <Label text="Current Price" />
        </CardSection>

        <CardSection>
          {stat ? <Value value={stat.totalSupply} /> : <ValueSkeleton />}
          <Label text="Total Supply" />
        </CardSection>
      </StyledCards>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  @media (max-width: 768px) {
    margin-top: ${(props) => props.theme.spacing[4]}px;
  }
`;

const CardHeader = styled.h2`
  color: #fff;
  text-align: center;
`;

const StyledCards = styled.div`
  min-width: 200px;
  padding: ${(props) => props.theme.spacing[3]}px;
  color: ${(props) => props.theme.color.white};
  background-color: ${(props) => props.theme.color.grey[900]};
  border-radius: 5px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const CardSection = styled.div`
  padding: ${(props) => props.theme.spacing[2]}px ${(props) => props.theme.spacing[3]}px
    ${(props) => props.theme.spacing[3]}px ${(props) => props.theme.spacing[3]}px;
  background-color: ${(props) => props.theme.color.grey[800]};
  border-radius: 5px;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ValueSkeletonPadding = styled.div`
  padding-top: ${(props) => props.theme.spacing[3]}px;
  padding-bottom: ${(props) => props.theme.spacing[2]}px;
`;

const ValueSkeleton = () => {
  const theme = useContext(ThemeContext);
  return (
    <SkeletonTheme color={theme.color.grey[700]} highlightColor={theme.color.grey[600]}>
      <ValueSkeletonPadding>
        <Skeleton height={10} />
      </ValueSkeletonPadding>
    </SkeletonTheme>
  );
};

const GuideText = styled.span`
  color: ${(props) => props.theme.color.primary.main};
  font-size: 0.8rem;
`;

const ValueText = styled.p`
  color: ${(props) => props.theme.color.white};
  font-weight: bold;
  font-size: 1.25rem;
  margin: ${(props) => props.theme.spacing[1]}px 0;
`;

export default HomeCard;
