import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

export default function SimpleMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [masterVolumn, setMasterVolumn] = React.useState(1);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onChangeVolume = (e) => {
    setMasterVolumn(parseFloat(e.target.value));

  };

  var ButtonStyle = {
    color: "white",
  };

  return (
    <div>
      <Button
        style={ButtonStyle}
        aria-controls="simple-menu1"
        aria-haspopup="true"
        onClick={handleClick}
      >
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
        <MenuItem onClick={() => props.onChange(masterVolumn)}>
          Master Volume{" "}
          <input
            type="range"
            min="0"
            max="1"
            step="any"
            onChange={onChangeVolume}
          />
        </MenuItem>
        <MenuItem onClick={handleClose}>Setting2</MenuItem>
      </Menu>
    </div>
  );
}
