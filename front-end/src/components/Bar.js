import React from "react";
import FileButton from "./FileButton.js";
import SettingButton from "./SettingButton.js";
import { Grid } from "@material-ui/core";

export default function SimpleMenu(props) {
  const [nameState, setNameState] = React.useState("testt");
  var rootStyle = {
    backgroundColor: "#141414",
  };

  var ButtonStyle = {
    color: "white",
  };

  return (
    <div align="left" style={rootStyle}>
      <Grid container direction="row">
        <FileButton onChangeURL={(url) => props.onURLChange(url)} />
        <SettingButton onChange={(value) => props.onVolumeChange(value)} />
      </Grid>
    </div>
  );
}
