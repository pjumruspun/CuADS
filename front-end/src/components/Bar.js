import React, { useState } from "react";
import FileButton from "./FileButton.js";
import SettingButton from "./SettingButton.js";
import { Grid } from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

export default function SimpleMenu(props) {
  var rootStyle = {
    backgroundColor: "#141414",
  };

  var ButtonStyle = {
    color: "white",
  };
  
  function getModalStyle() { 
    return {
      top: `50%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`,
    };
  }

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));


  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [percentage, setPercentage] = useState(0);
  const [progress, setProgress] = useState(null);
  const [open, setOpen] = React.useState(false);
  
  const onUploading = (progress) => {
    setPercentage(progress)
	}
  const onProgressChange = (progress) => {
    setProgress(progress)
   }

  const handleClose = () => {
    setOpen(false);
  };

   const progressStyle = {
     color: '#F2C94C',
     padding: '0 10px 0 10px'
   }

  return (
    <div align="left" style={rootStyle}>
      <Grid container direction="row">
        <FileButton
          onChange={(url) => props.onURLChange(url)}
          onProjectChange={(project) => props.onProjectChange(project)}
          onSaveProject={() => props.onSaveProject()}
	        onUploading={onUploading}
	        onProgressChange={onProgressChange}
        />
        <SettingButton onChange={(value) => props.onVolumeChange(value)} />
        <Modal
          onUploading={onUploading}
	        onProgressChange={onProgressChange}
          open={progress === 'in-progress' ? true : false}
        >
          <div style={modalStyle} className={classes.paper}>
            { progress === 'in-progress' ? <CircularProgress variant="determinate" style={progressStyle} value={percentage} /> : null }
            <p className="text">{progress === 'in-progress' ? 'Uploading' : null}</p>
          </div>
        </Modal>
      </Grid>
    </div>
  );
}
