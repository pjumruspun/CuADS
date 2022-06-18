import { Grid } from "@material-ui/core";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import "typeface-roboto";

const robotoFont = require("typeface-roboto");

// Div style
const rootStyle = {
  backgroundColor: "#333333",
  display: "flex",
  height: "100%",
  width: "40%",
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

const shrinkedInputLabelProps = {
  shrink: true,
  style: {
    color: "gray",
  },
};

const ttsSources = [
  {
    value: "Google",
    label: "Google",
  },
  {
    value: "Chula",
    label: "Chula",
  },
];

const rowStyle = {
  marginTop: "12px",
  marginBottom: "12px",
};

const timeInputFieldStyle = {
  width: "100%",
};

const colElementInputStyle = {
  marginRight: "12px",
};

function CenteredLabelText(text, style = null) {
  return (
    <Typography align="center" style={style}>
      {text}
    </Typography>
  );
}

function Row(children) {
  return (
    <Grid item style={rowStyle}>
      {children}
    </Grid>
  );
}

function Column(children) {
  return (
    <Grid container justify="flex-start" alignItems="center">
      {children}
    </Grid>
  );
}

function InputTextField() {
  return (
    <TextField
      id="input-text"
      label="Input Text"
      variant="filled"
      InputLabelProps={shrinkedInputLabelProps}
      InputProps={inputProps}
      color="white"
      fullWidth
      multiline
      minRows={2}
      maxRows={2}
    ></TextField>
  );
}

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
        color="white"
        size="small"
        style={timeInputFieldStyle}
      ></TextField>
    </Grid>
  );
}

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
        color="white"
        size="small"
        style={colElementInputStyle}
        defaultValue={defaultValue}
      ></TextField>
    </Grid>
  );
}

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
        color="white"
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

function ScriptBox() {
  const [source, setSource] = React.useState("Google");

  const handleSourceChange = (event) => {
    setSource(event.target.value);
  };
  return (
    <div align="left" style={rootStyle}>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        style={scriptBoxStyle}
      >
        {Row(CenteredLabelText("Script:"))}
        {InputTextField()}
        {Row(
          Column([
            TimeInputField("start-time", "Start"),

            CenteredLabelText("To", {
              marginLeft: "12px",
              marginRight: "12px",
            }),
            TimeInputField("end-time", "End"),
          ])
        )}
        {Row(
          Column([
            NumberInputField("volume", "Volume%", 100),
            NumberInputField("speed", "Speed%", 100),
            SelectionInputField(
              "tts-source",
              "TTS Source",
              ttsSources,
              source,
              handleSourceChange
            ),
          ])
        )}
      </Grid>
    </div>
  );
}

export default ScriptBox;
