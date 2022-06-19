import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { inputProps, shrinkedInputLabelProps } from "./ScriptBox";

function SelectionInputField(id, label, choices, state, handleChange) {
  return (
    <Grid item xs={4}>
      <TextField
        id="volume"
        label="Source"
        variant="filled"
        select
        value={state}
        onChange={handleChange}
        InputLabelProps={shrinkedInputLabelProps}
        InputProps={inputProps}
        size="small"
        style={{ width: "90%" }}
      >
        {choices.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Grid>
  );
}

export default SelectionInputField;
