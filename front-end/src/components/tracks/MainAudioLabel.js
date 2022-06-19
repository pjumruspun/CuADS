import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import * as constant from "../../Constants";
import { trackNameStyle } from "./TrackArea";

const rootStyle = {
  height: constant.audioTrackHeight,
  border: constant.trackAreaBorder,
  backgroundColor: constant.trackItemBackgroundColor,
};

function MainAudioLabel() {
  return (
    <Grid item xs={constant.trackAreaLeftXs} style={rootStyle}>
      <Typography align="left" style={trackNameStyle}>
        Main Audio
      </Typography>
    </Grid>
  );
}

export default MainAudioLabel;
