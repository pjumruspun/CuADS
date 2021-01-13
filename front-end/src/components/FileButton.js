import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

export default function SimpleMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleImport = () => {
    var fileInput = document.getElementById("video-input");
    var files = fileInput.files;
    var file;

    for (var i = 0; i < files.length; ++i) {
      file = files.item(i);
      alert(file.name);
    }
    console.log(file.name);
    setAnchorEl(null);
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
        File
      </Button>
      <Menu
        id="simple-menu1"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorPosition={{ vertical: "top", horizontal: "left" }}
      >
        <MenuItem for="file-upload">
          <label for="avatar">Import </label>
          <input
            type="file"
            id="video-input"
            accept="video/mp4, video/webm"
            onChange={handleImport}
          />
        </MenuItem>
        <MenuItem onClick={handleClose}>Export</MenuItem>
      </Menu>
    </div>
  );
}
