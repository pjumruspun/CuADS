import React from "react";
import PlayPauseButton from "./PlayPauseButton";
import Typography from "@material-ui/core/Typography";
import formatSeconds from "./FormatDuration";
import Grid from "@material-ui/core/Grid";
import Seeker from "./Seeker";

const rootStyle = {
  backgroundColor: "black",
  width: "100%",
  height: "10%",
  display: "flex",
};

// The 0:00:00/0:00:00 at bottom left of the video
function DurationDisplay(props) {
  return (
    <Typography style={{ justifyContent: "flex-start" }}>
      {formatSeconds(props.playedSeconds)}/{formatSeconds(props.duration)}
    </Typography>
  );
}

// The black bar beneath the video that contains time and play/pause button
function PlayerControlBar(props) {
  return (
    <ul style={rootStyle}>
      <Grid container direction="row">
        <Seeker
          played={props.played}
          setPlayed={props.setPlayed}
          playing={props.playing}
          setPlaying={props.setPlaying}
          player={props.player}
        ></Seeker>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignContent="center"
          alignItems="center"
        >
          <Grid item xs={5}>
            <DurationDisplay
              playedSeconds={props.playedSeconds}
              duration={props.duration}
            ></DurationDisplay>
          </Grid>
          <Grid item xs={1}>
            <PlayPauseButton
              playing={props.playing}
              setPlaying={props.setPlaying}
            ></PlayPauseButton>
          </Grid>
          <Grid item xs={5}></Grid>
        </Grid>
      </Grid>
    </ul>
  );
}

export default PlayerControlBar;
