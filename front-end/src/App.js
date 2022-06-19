import React from "react";
import MenuBar from "./components/menubar/MenuBar";
import ScriptBox from "./components/scriptbox/ScriptBox";
import Player from "./components/player/Player";
import TrackArea from "./components/tracks/TrackArea";
import { Grid } from "@material-ui/core";

const rootStyle = {
  backgroundColor: "#222222",
  height: "100%",
  color: "white",
};

const gridStyle = {
  height: "400px",
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
