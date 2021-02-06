import React from 'react';
import styled from 'styled-components';

interface MICInfoProp {
  spotPrice: string,
  twapPrice: string,
  supply: string
}

const MICInfo: React.FC<MICInfoProp> = ({
  spotPrice,
  twapPrice,
  supply,
}) => {
  return (
    <Wrapper>
      <MICData title='MIC Spot Price' value={spotPrice} />
      <MICData title='MIC 24 TWAP Price' value={twapPrice} />
      <MICData title="MIC Supply" value={supply} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  
  @media (max-width: 768px) {
    margin-top: ${(props) => props.theme.spacing[4]}px;
  }
`;

interface MICDataProp {
  title: string,
  value: string,
}

const MICData: React.FC<MICDataProp> = ({
  title,
  value,
}) => {
  return (
    <DataWrapper>
      <DataHeader>{title}</DataHeader>
      <DataValue>{value}</DataValue>
    </DataWrapper>
  )
};

const DataWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const DataHeader = styled.h4`
  margin-bottom: ${(props) => props.theme.spacing[2]}px;
  color: ${(props) => props.theme.color.gold};
`;

const DataValue = styled.div`
  color: ${(props) => props.theme.color.grey[200]}
`;

export default MICInfo;
