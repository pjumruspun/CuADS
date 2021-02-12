import React, { useState } from "react";
import FileButton from "./FileButton.js";
import SettingButton from "./SettingButton.js";
import { Grid } from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';

export default function SimpleMenu(props) {
  var rootStyle = {
    backgroundColor: "#141414",
  };

  var ButtonStyle = {
    color: "white",
  };
  const [percentage, setPercentage] = useState(0);
  const [progress, setProgress] = useState(null);
  
  const onUploading = (progress) => {
      setPercentage(progress)
	}
  const onProgressChange = (progress) => {
      setProgress(progress)
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
	{ progress === 'in-progress' ? <CircularProgress variant="determinate" value={percentage} /> : null }
      <span className="text">{progress === 'in-progress' ? 'Uploading' : null}</span>
      </Grid>
    </div>
  );
}
