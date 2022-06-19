import React from "react";
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
        <Player></Player>
      </Grid>
      <TrackArea></TrackArea>
    </div>
  );
}

export default App;
