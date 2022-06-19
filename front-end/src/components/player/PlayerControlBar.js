import React from "react";
import PlayPauseButton from "./PlayPauseButton";

const rootStyle = {
  backgroundColor: "black",
  width: "100%",
  height: "10%",
  display: "flex",
  justifyContent: "center",
  margin: "auto",
};

function PlayerControlBar(props) {
  return (
    <ul style={rootStyle}>
      <PlayPauseButton
        playing={props.playing}
        setPlaying={props.setPlaying}
      ></PlayPauseButton>
    </ul>
  );
}

export default PlayerControlBar;
