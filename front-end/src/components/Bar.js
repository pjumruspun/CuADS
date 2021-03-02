import React, { useState } from "react";
import FileButton from "./FileButton.js";
import SettingButton from "./SettingButton.js";
import { Grid } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

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
    setPercentage(progress);
  };
  const onProgressChange = (progress) => {
    setProgress(progress);
  };

  const progressStyle = {
    color: "#F2C94C",
    padding: "0 10px 0 10px",
  };

  return (
    <div align="left" style={rootStyle}>
      <Grid container direction="row">
        <FileButton
          onChange={(url) => props.onURLChange(url)}
          onProjectChange={(project) => props.onProjectChange(project)}
          onSaveProject={() => props.onSaveProject()}
          onUploading={onUploading}
          onProgressChange={onProgressChange}
          onImport={(fileName) => props.onImport(fileName)}
        />
        <SettingButton onChange={(value) => props.onVolumeChange(value)} />
        {progress === "in-progress" ? (
          <CircularProgress
            variant="determinate"
            style={progressStyle}
            value={percentage}
          />
        ) : null}
        <span className="text">
          {progress === "in-progress" ? "Uploading" : null}
        </span>
      </Grid>
    </div>
  );
}
