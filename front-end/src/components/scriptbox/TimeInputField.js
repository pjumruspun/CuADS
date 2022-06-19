import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { inputProps, shrinkedInputLabelProps } from "./ScriptBox";

const timeInputFieldStyle = {
  width: "100%",
};

function TimeInputField(id, label) {
  return (
    <Grid item xs={4}>
      <TextField
        id={id}
        label={label}
        variant="filled"
        defaultValue="00:00:00:000"
        InputLabelProps={shrinkedInputLabelProps}
        InputProps={inputProps}
        size="small"
        style={timeInputFieldStyle}
      ></TextField>
    </Grid>
  );
}

export default TimeInputField;
