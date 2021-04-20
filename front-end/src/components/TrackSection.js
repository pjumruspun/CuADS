import React, { Component, useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TrackItem from "./TrackItem";
import AudioWave from "./AudioWave";
import axios from "axios";

var rootStyle = {
  backgroundColor: "#2e2d2d",
  height: "auto",
  width: "98vw",
  align: "bottom",
  marginBottom: "10vh",
};
class TrackSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: this.props.tracks,
      localTrackId: this.props.localTrackId,
      selecting: -1,
      trackselecting: 99,
    };
    this.handleTTSDelete = props.handleTTSDelete;
  }

  onAddTrack = () => {
    if (this.props.projectId.length == 0) {
      alert("Please create or open a new project before creating a new track.");
      return;
    }

    this.props.onAddTrack();
  };

  onDeleteTrack = (localTrackId) => {
    // The deletion code below is currently not working for some reason
    // Maybe we need to delete it in App.js
    this.props.onDeleteTrack(localTrackId);
  };

  handleSelecting = (e) => {
    this.setState({ selecting: e });
    this.props.setText(e);
  };
  handleTrackSelecting = (e) => {
    this.setState({ trackselecting: e.localTrackId });
    this.props.onSelectTrack(e.localTrackId);
  };
  render() {
    return (
      <div style={rootStyle}>
        <Grid container>
          <Grid container direction="row" style={{ paddingLeft: "10px" }}>
            <Grid
              item
              xs={3}
              direction="column"
              style={{
                alignContent: "left",
                backgroundColor: "#333333",
                height: "10vh",
                width: "10vw",
                border: "solid",
                borderWidth: "thin",
                borderColor: "#4F4F4F",
              }}
            >
              <Button
                onClick={this.onAddTrack}
                style={{ textTransform: "none", color: "#E0E0E0" }}
              >
                +new track
              </Button>
            </Grid>
            <Grid
              item
              xs={9}
              direction="column"
              style={{
                backgroundColor: "#333333",
                height: "10vh",
                border: "solid",
                borderWidth: "thin",
                borderColor: "#4F4F4F",
              }}
            >
              time ruler section
            </Grid>
          </Grid>
          <Grid container direction="row" style={{ paddingLeft: "10px" }}>
            <Grid
              item
              xs={3}
              direction="column"
              style={{
                backgroundColor: "#333333",
                height: "12vh",
                width: "10vw",
                border: "solid",
                borderWidth: "thin",
                borderColor: "#4F4F4F",
              }}
            >
              audio track
            </Grid>
            <Grid
              item
              xs={9}
              direction="column"
              style={{
                backgroundColor: "#333333",
                height: "12vh",
                width: "10vw",
                border: "solid",
                borderWidth: "thin",
                borderColor: "#4F4F4F",
              }}
            >
              <div>
                {this.props.url !== undefined && this.props.url != "" && (
                  <AudioWave
                    url={this.props.url}
                    zoom={this.props.zoom}
                    playing={this.props.playing}
                    played={this.props.played}
                  />
                )}
              </div>
            </Grid>
          </Grid>
          {this.props.tracks.map((track) => (
            <TrackItem
              key={track.localTrackId}
              localTrackId={track.localTrackId}
              name={track.name}
              backendId={track.backendId}
              onDeleteTrack={this.onDeleteTrack}
              handleTTSDelete={this.handleTTSDelete}
              onSelected={(volume, speed, text) =>
                this.props.onSelected(volume, speed, text)
              }
              onSelecting={(e) => this.handleSelecting(e)}
              onTrackSelecting={(e) => this.handleTrackSelecting(e)}
              trackvolume={this.props.trackvolume}
              speed={this.props.speed}
              playing={this.props.playing}
              played={this.props.played}
              selecting={this.state.selecting}
              trackselecting={this.state.trackselecting}
              ttsList={this.props.tts}
              text={this.props.text}
              onNameChange={this.props.onNameChange}
            />
          ))}
        </Grid>
      </div>
    );
  }
}

export default TrackSection;
