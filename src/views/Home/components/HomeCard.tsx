import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import Label from '../../../components/Label';
import { TokenStat } from '../../../basis-cash/types';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { commify } from 'ethers/lib/utils';
import config from '../../../config';

interface HomeCardProps {
  title: string;
  backgroundImg: string;
  headerColor: string;
  supplyLabel?: string;
  address: string;
  stat?: TokenStat;
}

const HomeCard: React.FC<HomeCardProps> = ({
  title,
  backgroundImg,
  headerColor,
  address,
  supplyLabel = 'Total Supply',
  stat,
}) => {
  const tokenUrl = `${config.etherscanUrl}/token/${address}`;
  const { color } = useContext(ThemeContext);

  return (
    <Wrapper>
      <CardHeader color={headerColor}>{title}</CardHeader>
      <StyledCards>
        <CardBody backgroundImg={backgroundImg}>
          <CardContent>
            <CardSection>
              {stat ? (
                <StyledValue>{(stat.priceInUSDT !== '-' ? '$' : '') + stat.priceInUSDT}</StyledValue>
              ) : (
                <ValueSkeleton />
              )}
              <Label text="Current Price" color={color.gold} />
            </CardSection>

            <CardSection>
              {stat ? (
                <StyledValue>{commify(stat.totalSupply)}</StyledValue>
              ) : (
                <ValueSkeleton />
              )}
              <StyledSupplyLabel href={tokenUrl} target="_blank" color={color.gold}>
                {supplyLabel}
              </StyledSupplyLabel>
            </CardSection>
          </CardContent>
        </CardBody>
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
  color: ${(props) => props.color};
  text-align: center;
`;

interface StyledCardsProps {
  backgroundImg: string;
}

const StyledCards = styled.div`
  color: ${(props) => props.theme.color.white};
  padding: ${(props) => props.theme.spacing[3]}px;
  background-color: #26272D;
  border-radius: 20px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const CardBody = styled.div<StyledCardsProps>`
  width: 267px;
  height: 347px;
  background-image: url("${(props) => props.backgroundImg}");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;

const CardContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  top: 51%;
  height: 50%;
  box-sizing: border-box;
  padding: 24px;
`;

const StyledValue = styled.span`
  display: inline-block;
  font-size: 24px;
  font-weight: bold;
  color: ${(props) => props.theme.color.gold};
`;

const CardSection = styled.div`
`;

const ValueSkeletonPadding = styled.div`
`;

const StyledSupplyLabel = styled.a`
  display: block;
  color: ${(props) => props.theme.color.gold};
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
