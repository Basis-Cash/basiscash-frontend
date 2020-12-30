import React from 'react';
import styled from 'styled-components';

import mithCash from '../../assets/img/mithCash.svg';

const Logo: React.FC = () => {
  return (
    <StyledLogo>
      <img src={mithCash} height="32" style={{ marginTop: -4 }} />
      <StyledLink href="/">MITH Cash</StyledLink>
    </StyledLogo>
  );
};

const StyledLogo = styled.div`
  align-items: center;
  display: flex;
`;

const StyledLink = styled.a`
  color: ${(props) => props.theme.color.grey[100]};
  text-decoration: none;
  font-size: 18px;
  font-weight: 700;
  margin-left: ${(props) => props.theme.spacing[2]}px;
`;

export default Logo;
