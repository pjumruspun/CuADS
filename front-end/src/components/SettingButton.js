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

var ButtonStyle = {
  color : 'white'
  }

  return (
    <div>
      <Button style={ButtonStyle} aria-controls="simple-menu1" aria-haspopup="true" onClick={handleClick}>
        Setting
      </Button>
      <Menu
        id="simple-menu1"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
	anchorPosition={{ vertical: "top", horizontal: "left" }}
      >
        <MenuItem onClick={handleClose}>Setting1</MenuItem>
        <MenuItem onClick={handleClose}>Setting2</MenuItem>
      </Menu>
    </div>
  );
}
