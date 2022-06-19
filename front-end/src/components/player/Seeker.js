import React, { useState } from "react";
import Slider from "@material-ui/core/Slider";
import * as constant from "../../Constants";

const rootStyle = {
  width: constant.videoPlayerAreaWidth, // Same value as rootStyle width in Player.js
  position: "absolute", // Make slider overlap with the video
  marginTop: "-15px", // Move up so the slider lies on the bottom edge of the video
};

function Seeker(props) {
  const [seeking, setSeeking] = useState(false); // Is the video currently in seeking by user?
  const [wasPlaying, setWasPlaying] = useState(false); // Was the video playing before user seeking?

  const handleChange = (event, newValue) => {
    // Slider mouse down hold
    if (!seeking) {
      // If this is the first frame of user seeking
      // Mark as seeking
      setSeeking(true);

      // Memorized whether the video was playing or not
      setWasPlaying(props.playing);
    }

    props.setPlayed(newValue);
    props.setPlaying(false);
    props.player.seekTo(newValue);
  };

  const handleChangeCommitted = (event, newValue) => {
    // Slider mouse up
    // Mark as stop seeking
    setSeeking(false);

    // Whether video should be playing depends on
    // The memorized state before seeking
    props.setPlaying(wasPlaying);
  };

  return (
    <Slider
      value={props.played}
      onChange={handleChange}
      onChangeCommitted={handleChangeCommitted}
      min={0.0}
      max={1.0}
      step={0.000001}
      style={rootStyle}
    ></Slider>
  );
}

export default Seeker;
