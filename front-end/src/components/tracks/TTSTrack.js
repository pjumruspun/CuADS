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

function TTSTrack(props) {
  return (
    <Grid container direction="row">
      <Grid item xs={constant.trackAreaLeftXs} style={rootStyle}>
        <Typography align="left" style={trackNameStyle}>
          {props.trackName}
        </Typography>
      </Grid>
      <Grid item xs={constant.trackAreaRightXs} style={rootStyle}>
        TTS Audio Wave
      </Grid>
    </Grid>
  );
}

export default TTSTrack;
