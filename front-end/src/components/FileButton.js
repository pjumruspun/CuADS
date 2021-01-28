import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";

export default function SimpleMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleImport = () => {
    console.log("handleImport");
    var fileInput = document.getElementById("video-input");
    var files = fileInput.files;
    var file;

    file = files.item(0);
    if (file) console.log(file.name);

    var formData = new FormData();
    formData.append("upload", file);
    axios
      .post(`http://localhost:3001/fileupload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        // res.data contains S3 video URL
        console.log(res.data);
        props.onChangeURL(res.data);
      });

    document.getElementById("video-input").value = "";

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
          <label className="custom-file-upload">
            {" "}
            <input
              type="file"
              id="video-input"
              hidden
              accept="video/mp4, video/webm"
              onChange={handleImport}
            />{" "}
            <i className="fa fa-cloud-upload" /> Import{" "}
          </label>
        </MenuItem>
        <MenuItem onClick={handleClose}>Export</MenuItem>
      </Menu>
    </div>
  );
}
