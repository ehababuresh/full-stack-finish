import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';

const LogoIcon = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        sx={{ display: { xs: 'inline-flex', md: 'none' } }}
      >
        <Avatar alt="Business card icon" src="/assets/images/business-card.png" />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
          <MenuItem onClick={handleClose}>
          <Link to="/cards">cards</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/about">About</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/fav-cards">Favorite Cards</Link>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default LogoIcon;
