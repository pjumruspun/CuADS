import React from "react";
import MenuItem from "@material-ui/core/MenuItem";

export default function ExportCsvButton(props) {
  const handleClick = () => {
    // axios.get export
    console.log(`exporting track ${props.trackId}`);
    window.open(
      `http://localhost:3001/audio-clips/export/csv/${props.trackId}`
    );
  };
  return <MenuItem onClick={handleClick}>{props.text}</MenuItem>;
}
