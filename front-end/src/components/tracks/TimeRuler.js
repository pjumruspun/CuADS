import React from "react";
import Grid from "@material-ui/core/Grid";
import * as constant from "../../Constants";

const rootStyle = {
  height: constant.timeRulerHeight,
  border: constant.trackAreaBorder,
};

function TimeRuler() {
  return <Grid item xs={constant.trackAreaRightXs} style={rootStyle}></Grid>;
}

export default TimeRuler;
