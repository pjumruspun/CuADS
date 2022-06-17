import React, { useState } from "react";
import "./MenuBar.css";
import Button from "@material-ui/core/Button";
import MenuList from "@material-ui/core/MenuList";
import { ClickAwayListener, Paper, Popper } from "@material-ui/core";
import { PopperPlacementType } from "@material-ui/core";
import Grow from "@material-ui/core/Grow";

function MenuButton(props) {
  const menuButtonStyle = {
    color: "white",
  };

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef < HTMLButtonElement > null;

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClose = (event) => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        className="menu-button"
        onClick={handleToggle}
        style={menuButtonStyle}
      >
        {props.text}
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
        style={{
          top: "unset",
          left: "unset",
        }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <ClickAwayListener onClickAway={handleClose}>
              <Paper>
                <MenuList>{props.children}</MenuList>
              </Paper>
            </ClickAwayListener>
          </Grow>
        )}
      </Popper>
    </div>
  );
}

export default MenuButton;
