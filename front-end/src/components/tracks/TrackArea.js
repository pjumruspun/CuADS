import React from "react";
import Grid from "@material-ui/core/Grid";
import MainAudioLabel from "./MainAudioLabel";
import MainAudioWave from "./MainAudioWave";
import AddTrackButton from "./AddTrackButton";
import TimeRuler from "./TimeRuler";
import TTSTrack from "./TTSTrack";
import * as constant from "../../Constants";

const rootStyle = {
  backgroundColor: constant.trackAreaBackgroundColor,
  display: "flex",
  height: "100%",
  width: "100%",
};

export const trackNameStyle = {
  marginLeft: "20px",
  marginTop: "10%",
  marginBottom: "10%",
};

function TrackArea() {
  return (
    <div style={rootStyle}>
      <Grid container direction="column">
        <Grid container direction="row">
          <AddTrackButton></AddTrackButton>
          <TimeRuler></TimeRuler>
        </Grid>
        <Grid container direction="row">
          <MainAudioLabel></MainAudioLabel>
          <MainAudioWave></MainAudioWave>
        </Grid>
        <TTSTrack trackName="TTS1"></TTSTrack>
      </Grid>
    </div>
  );
}

export default TrackArea;
