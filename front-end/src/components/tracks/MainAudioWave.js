import React from "react";
import Grid from "@material-ui/core/Grid";
import * as constant from "../../Constants";

const rootStyle = {
  height: constant.audioTrackHeight,
  border: constant.trackAreaBorder,
  backgroundColor: constant.trackItemBackgroundColor,
};

function MainAudioWave() {
  return (
    <Grid item xs={constant.trackAreaRightXs} style={rootStyle}>
      Main Audio Wave
    </Grid>
  );
}

export default MainAudioWave;
