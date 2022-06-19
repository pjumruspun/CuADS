import Grid from "@material-ui/core/Grid";
import React from "react";
import Typography from "@material-ui/core/Typography";
import TimeInputField from "./TimeInputField";
import TextInputField from "./TextInputField";
import NumberInputField from "./NumberInputField";
import SelectionInputField from "./SelectionInputField";
import * as constant from "../../Constants";
import "typeface-roboto";

// Div style
const rootStyle = {
  backgroundColor: constant.scriptBoxBackgroundColor,
  display: "flex",
  height: "100%",
  width: constant.scriptBoxAreaWidth,
};

// Main grid style
const scriptBoxStyle = {
  padding: "12px",
};

// Typed text style
export const inputProps = {
  style: {
    color: "white",
  },
};

// Label text style
export const shrinkedInputLabelProps = {
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

export const colElementInputStyle = {
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
    <Grid container justifyContent="flex-start" alignItems="center">
      {children}
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
        justifyContent="flex-start"
        alignItems="flex-start"
        style={scriptBoxStyle}
      >
        {Row(CenteredLabelText("Script:"))}
        {TextInputField()}
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
