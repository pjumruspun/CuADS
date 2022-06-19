import React from "react";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import AddCircle from "@material-ui/icons/AddCircle";
import Typography from "@material-ui/core/Typography";
import * as constant from "../../Constants";

const rootStyle = {
  height: constant.timeRulerHeight,
  border: constant.trackAreaBorder,
};

const addTrackButtonStyle = {
  color: constant.addTrackButtonColor,
  borderRadius: 0,
};

function AddTrackButton() {
  return (
    <Grid item xs={constant.trackAreaLeftXs} style={rootStyle}>
      <IconButton style={addTrackButtonStyle}>
        <AddCircle></AddCircle>
        <Typography>Add New Track</Typography>
      </IconButton>
    </Grid>
  );
}
export default AddTrackButton;
