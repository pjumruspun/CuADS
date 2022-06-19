import React from "react";
import MenuButton from "./MenuButton";
import MenuItem from "@material-ui/core/MenuItem";
import * as constant from "../../Constants";

const menuBarStyle = {
  height: constant.menuBarHeight,
  backgroundColor: constant.menuBarBackgroundCOlor,
  padding: "0px 1rem",
  borderBottom: "1px solid #474a4d",
};

const menubarMenuStyle = {
  maxWidth: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "flex-start",
};

const menubarLogoStyle = {
  height: constant.menuBarLogoHeight,
  marginTop: "auto",
  marginBottom: "auto",
  marginRight: "10px",
};

function MenuBar() {
  return (
    <nav style={menuBarStyle}>
      <ul style={menubarMenuStyle}>
        <img src={constant.menuBarLogoPath} style={menubarLogoStyle}></img>
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
