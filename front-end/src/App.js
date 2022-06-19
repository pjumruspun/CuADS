import React, { useState } from "react";
import MenuBar from "./components/menubar/MenuBar";
import ScriptBox from "./components/scriptbox/ScriptBox";
import Player from "./components/player/Player";
import TrackArea from "./components/tracks/TrackArea";
import { Grid } from "@material-ui/core";
import * as constant from "./Constants";

const rootStyle = {
  color: constant.mainFontColor,
};

const gridStyle = {
  height: constant.scriptBoxAndVideoHeight,
};

function App() {
  // For holding duration from Player
  // Pass value down to TrackArea
  const [duration, setDuration] = useState(0.0);

  return (
    <div style={rootStyle}>
      <MenuBar></MenuBar>
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        style={gridStyle}
      >
        <ScriptBox></ScriptBox>
        <Player setDuration={setDuration}></Player>
      </Grid>
      <TrackArea duration={duration}></TrackArea>
    </div>
  );
}

export default App;
