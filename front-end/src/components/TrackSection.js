import React, { Component, useState } from "react";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TrackItem from "./TrackItem";

var rootStyle = {
  backgroundColor: "#141414",
  height: "auto",
  width: "100vw",
  align: "bottom",
  marginBottom: "10vh",
};

class TrackSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numTracks: 0,
      track_items: [],
    };
  }

  onAddTrack = (trackId) => {
    this.setState({
      numTracks: this.state.numTracks + 1,
    });
  };



  render() {
    for (var i = 0; i < this.state.numTracks; i += 1) {
      track_items.push(<TrackItem key={i} id={i} onDeleteTrack = {this.onDeleteTrack}/>);
    }

    return (
      <div style={rootStyle}>
        <Grid container style={{ margin: "3px" }}>
          <Grid container direction="row">
            <Grid item direction="column" style={{ backgroundColor: "333333" }}>
              <Button onClick={this.onAddTrack} color="primary">
                +new track
              </Button>
            </Grid>
            <Grid item direction="column" style={{ backgroundColor: "7C7C7C" }}>
              time ruler section
            </Grid>
          </Grid>
          <Grid container direction="row">
            video track
          </Grid>
          <Grid container direction="row">
            audio track
          </Grid>
          {track_items}
        </Grid>
      </div>
    );
  }
}

export default TrackSection;
