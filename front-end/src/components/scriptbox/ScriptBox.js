import { Grid } from "@material-ui/core";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";

// Div style
const rootStyle = {
  backgroundColor: "#333333",
  display: "flex",
  height: "100%",
  width: "50%",
};

// Main grid style
const scriptBoxStyle = {
  padding: "12px",
};

// Preview text style
const inputLabelProps = {
  style: {
    color: "gray",
  },
};

// Typed text style
const inputProps = {
  style: {
    color: "white",
  },
};

const timeInputLabelProps = {
  style: {
    color: "gray",
    shrink: true,
  },
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
        <TextField
          id="input-text"
          label="Input Text"
          variant="filled"
          InputLabelProps={inputLabelProps}
          InputProps={inputProps}
          color="white"
          fullWidth
          multiline
          minRows={2}
          maxRows={2}
        ></TextField>
        <Grid container justify="flex-start" alignItems="center">
          <Grid item xs={4} md={1}>
            Time
          </Grid>
          <Grid item xs={4} md={4}>
            <TextField
              id="start-time"
              label="Start"
              variant="filled"
              InputLabelProps={timeInputLabelProps}
              InputProps={inputProps}
              color="white"
              size="small"
              style={{ width: "90%" }}
            ></TextField>
          </Grid>
          <Grid item xs={4} md={4}>
            <TextField
              id="end-time"
              label="End"
              variant="filled"
              InputLabelProps={timeInputLabelProps}
              InputProps={inputProps}
              color="white"
              size="small"
              style={{ width: "90%" }}
            ></TextField>
          </Grid>
        </Grid>

        <h4>Adjustment</h4>
        <h4>Volume</h4>
        <h4>Speed</h4>
        <h4>Source</h4>
      </Grid>
    </div>
  );
}

export default ScriptBox;
