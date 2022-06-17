import React from "react";
import "./MenuBar.css";
import MenuButton from "./MenuButton";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { ClickAwayListener, Paper } from "@material-ui/core";

function MenuBar() {
  return (
    <nav className="menubar">
      <ul className="menubar-menu">
        <img src="ADlogo.svg" className="menubar-logo"></img>
        <MenuButton text="File">
          <MenuItem>New Project</MenuItem>
          <MenuItem>Open Project</MenuItem>
          <MenuItem>Import Video</MenuItem>
          <MenuItem>Export As</MenuItem>
        </MenuButton>
        <MenuButton text="Settings">
          <MenuItem>Master Volume</MenuItem>
        </MenuButton>
      </ul>
    </nav>
  );
}

export default MenuBar;
