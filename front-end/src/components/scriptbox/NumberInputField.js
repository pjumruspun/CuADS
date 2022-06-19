import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {
  inputProps,
  shrinkedInputLabelProps,
  colElementInputStyle,
} from "./ScriptBox";

function NumberInputField(id, label, defaultValue = null) {
  return (
    <Grid item xs={2}>
      <TextField
        id={id}
        label={label}
        variant="filled"
        InputLabelProps={shrinkedInputLabelProps}
        InputProps={inputProps}
        type="number"
        size="small"
        style={colElementInputStyle}
        defaultValue={defaultValue}
      ></TextField>
    </Grid>
  );
}

export default NumberInputField;
