import React from "react";
import TextField from "@material-ui/core/TextField";
import { inputProps, shrinkedInputLabelProps } from "./ScriptBox";

function TextInputField() {
  return (
    <TextField
      id="input-text"
      label="Input Text"
      variant="filled"
      InputLabelProps={shrinkedInputLabelProps}
      InputProps={inputProps}
      fullWidth
      multiline
      minRows={2}
      maxRows={2}
    ></TextField>
  );
}

export default TextInputField;
