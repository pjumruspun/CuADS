import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MyModal from "./MyModal.js";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import NameModal from "./NameModal.js";
import fs from "fs";

export default function SimpleMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [modalShow, setModalShow] = React.useState(false);
  const classNames = {
    videoInput: "video-input",
  };

  const [percentage, setPercentage] = useState(0);
  const [progress, setProgress] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const handleNew = () => {
  //   axios
  //     .post(`http://localhost:3001/projects/new`, { name: "TEMP" })
  //     .then((res) => {
  //       const project = res.data;
  //       console.log(project);
  //       alert(`Created a new project with ID: ${project._id}`);
  //       props.onProjectChange(project);
  //     });

  //   setAnchorEl(null);
  // };

  const handleSave = () => {
    console.log("trying to save...");
    props.onSaveProject();
    setAnchorEl(null);
  };

  const handleImport = () => {
    var fileInput = document.getElementById(classNames.videoInput);
    var files = fileInput.files;
    var file;
    let progress = 0;

    setProgress("in-progress");
    props.onProgressChange("in-progress");
    file = files.item(0);
    if (file) console.log(file.name);

    props.onImport(file.name);

    // var formData = new FormData();
    // formData.append("upload", file);
    // axios
    //   .post(`http://localhost:3001/fileupload`, formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //     onUploadProgress: (ProgressEvent) => {
    //       const { loaded, total } = ProgressEvent;
    //       let progress = Math.floor((loaded / total) * 100);
    //       console.log(`${loaded}kb of ${total}kb | ${progress}%`);

    //       setPercentage(progress);
    //       props.onUploading(progress);
    //     },
    //   })
    //   .then((res) => {
    //     // res.data contains S3 video URL
    //     props.onChange(res.data);
    //     setProgress("finished");

    //     props.onProgressChange("finished");
    //   });

    // deselect the file
    document.getElementById(classNames.videoInput).value = "";

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
        {/* <MenuItem onClick={handleNew}>New</MenuItem> */}
        <NameModal
          onProjectChange={(project) => props.onProjectChange(project)}
        />
        <MenuItem onClick={handleSave}>Save</MenuItem>
        <MyModal
          onProjectChange={(project) => props.onProjectChange(project)}
        />
        <MenuItem for="file-upload">
          <label className="custom-file-upload">
            {" "}
            <input
              type="file"
              id={classNames.videoInput}
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
