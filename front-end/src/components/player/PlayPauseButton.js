import React from "react";
import IconButton from "@material-ui/core/IconButton";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import * as constant from "../../Constants";

const playPauseButtonBorderRadius = 0;

// Button that transforms into play/pause depends if the video's playing or not
function PlayPauseButton(props) {
  const playPauseButtonStyle = {
    width: constant.playPauseButtonWidth,
    height: constant.playPauseButtonHeight,
    borderRadius: playPauseButtonBorderRadius,
    color: constant.playPauseIconColor,
    backgroundColor: constant.playPauseButtonColor,
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
