import { AppBar, Box, Button, Toolbar } from '@material-ui/core';
import { Link } from 'gatsby';
import React, { FC } from 'react';

export const HEADER_HIGHT = 80;

const Header: FC = () => {
  return (
    <AppBar>
      <Toolbar
        style={{
          maxWidth: 1280,
          width: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
          height: HEADER_HIGHT,
        }}
      >
        <Link to="/">Lee Seung Geon</Link>
        <Box flexGrow={1} />
        <Link to="/about">About</Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
