import React from "react";
import IconButton from "@material-ui/core/IconButton";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";

// Play Pause Button Settings
const [playPauseButtonWidth, playPauseButtonHeight] = ["50px", "40px"];
const playPauseIconColor = "gray";
const playPauseButtonBackgroundColor = "black";
const playPauseButtonBorderRadius = 0;

// Button that transforms into play/pause depends if the video's playing or not
function PlayPauseButton(props) {
  const playPauseButtonStyle = {
    width: playPauseButtonWidth,
    height: playPauseButtonHeight,
    borderRadius: playPauseButtonBorderRadius,
    color: playPauseIconColor,
    backgroundColor: playPauseButtonBackgroundColor,
  };

  const handlePlayPause = (playing, setPlaying) => {
    setPlaying(!playing);
  };

  return (
    <IconButton
      style={playPauseButtonStyle}
      onClick={() => handlePlayPause(props.playing, props.setPlaying)}
    >
      {props.playing ? (
        <PauseIcon></PauseIcon>
      ) : (
        <PlayArrowIcon></PlayArrowIcon>
      )}
    </IconButton>
  );
}

export default PlayPauseButton;
