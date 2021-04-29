import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";

export default function TrackExportButton(props) {
  const handleClick = () => {
    // axios.get export
    console.log(`exporting track ${props.trackId}`);
    window.open(
      `http://localhost:3001/audio-clips/export/mp3/${props.trackId}`
    );
  };
  return <MenuItem onClick={handleClick}>{props.text}</MenuItem>;
}
