import React, { Component, useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TrackItem from "./TrackItem";
import AudioWave from "./AudioWave";
import axios from "axios";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import GridList from '@material-ui/core/GridList';

var rootStyle = {
  height: "auto",
  width: "100%",
  align: "bottom",
};

class TrackSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: this.props.tracks,
      localTrackId: this.props.localTrackId,
      selecting: -1,
      trackselecting: false,
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

  onDeleteTrack = (localTrackId,trackselected) => {
    // The deletion code below is currently not working for some reason
    // Maybe we need to delete it in App.js
    this.props.onDeleteTrack(localTrackId);
    if(trackselected){
    this.setState({ trackselecting: false});
    }
  };

  handleSelecting = (e) => {
    this.setState({ selecting: e });
    this.props.setText(e);
  };
  handleTrackSelecting = (e) => {
    this.setState({ trackselecting: e.trackselecting});
    this.props.onSelectTrack(e.localTrackId);
  };
  render() {
    return (
      <center><div style={rootStyle}>
        <Grid container>
          <Grid container direction="row" style={{ marginLeft: "40px", marginRight:'40px' }}>
            <Grid
              item
              xs={3}
              direction="column"
              style={{
                alignContent: "left",
                backgroundColor: "#333333",
                height: "5vh",
                width: "10vw",
                border: "solid",
                borderWidth: "thin",
                borderColor: "#4F4F4F",
                fontSize: "medium",
                textAlign: "left",
              }}
            >
              <Button
                onClick={this.onAddTrack}
                style={{ textTransform: "none", color: "#FFFFFF", fontSize: "medium" }}
              >
                <AddCircleIcon style={{color:"#6FCF97"}}/> &nbsp;New track
              </Button>
            </Grid>
            <Grid
              item
              xs={9}
              direction="column"
              style={{
                backgroundColor: "#333333",
                height: "5vh",
                border: "solid",
                borderWidth: "thin",
                borderColor: "#4F4F4F",
                padding: "10px 8px",
                fontSize: "medium",
                textAlign: "left",
              }}
            >
              Time ruler section
            </Grid>
          </Grid>
          <Grid container direction="row" style={{ marginLeft: "40px", marginRight:'40px' }}>
            <Grid
              item
              xs={3}
              direction="column"
              style={{
                backgroundColor: "#333333",
                height: "10vh",
                width: "10vw",
                border: "solid",
                borderWidth: "thin",
                borderColor: "#4F4F4F",
                textAlign: "left",
                fontSize: "medium",
                padding: "10px 8px",
              }}
            >
              Audio track
            </Grid>
            <Grid
              item
              xs={9}
              direction="column"
              style={{
                backgroundColor: "#222222",
                height: "10vh",
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
              onDeleteTrack={(e,f) =>this.onDeleteTrack(e,f)}
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
      </div></center>
    );
  }
}

export default TrackSection;
