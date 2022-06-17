import { Grid } from "@material-ui/core";
import React from "react";

var scriptBoxStyle = {
  padding: "12px",
};

var rootStyle = {
  backgroundColor: "#333333",
  display: "flex",
  height: "100%",
  width: "50%",
};

function ScriptBox() {
  return (
    <div align="left" style={rootStyle}>
      <Grid
        container
        direction="column"
        justify="space-around"
        alignItems="flex-start"
        style={scriptBoxStyle}
      >
        <h4>Script</h4>
        <h4>Time</h4>
        <h4>From To</h4>
        <h4>Adjustment</h4>
        <h4>Volume</h4>
        <h4>Speed</h4>
        <h4>Source</h4>
      </Grid>
    </div>
  );
}

export default ScriptBox;
