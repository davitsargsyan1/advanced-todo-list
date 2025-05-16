import React from 'react';
import { Link } from 'react-router-dom';

import { StyledHeader, Logo } from './styles';

const Header = () => {
  return (
    <StyledHeader>
      <Logo level={3}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
          Advanced Todo List
        </Link>
      </Logo>
    </StyledHeader>
  );
};

export default Header;
