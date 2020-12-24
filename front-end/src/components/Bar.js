import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

var rootStyle = {
  backgroundColor : '#141414',
  }

var ButtonStyle = {
  color : 'white'
  }

  return (
    <div align="left" style={rootStyle}>
      <Button style={ButtonStyle} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        File
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Import</MenuItem>
        <MenuItem onClick={handleClose}>Export</MenuItem>
      </Menu>
	<Button style={ButtonStyle} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Setting
      </Button>
	<Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Setting1</MenuItem>
        <MenuItem onClick={handleClose}>Setting2</MenuItem>
      </Menu>
    </div>
  );
}