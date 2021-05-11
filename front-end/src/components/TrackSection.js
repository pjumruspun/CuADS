import React, { Component, useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TrackItem from "./TrackItem";
import AudioWave from "./AudioWave";
import axios from "axios";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import GridList from "@material-ui/core/GridList";

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
      fullLength: undefined,
      offset: 0,
      xScroll: 0,
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
    this.props.onDeleteTrack(localTrackId);
  };

  onZoomFinish = () => {
    let newWidth = 0;
    const child = document.querySelector("#origin-waveform").firstElementChild
      .childNodes;
    for (let i = 1; i < child.length; i++) {
      newWidth += parseInt(child[i].style.width.replace("px", ""));
    }
    this.setState({ fullLength: newWidth });
  };

  onScroll = (e) => {
    console.log(e);
  };

  handleUpdateXScroll = (e) => {
    this.setState({ xScroll: e });
    //console.log(e);
    //console.log(this.state.xScroll);
  };

  handleSelecting = (e) => {
    this.props.setText(e);
  };

  handleTrackSelecting = (e) => {
    console.log(e);
    this.props.onSelectTrack(e.backendId);
    this.props.setTTS(e.ttsList);
  };

  render() {
    return (
      <center>
        <div style={rootStyle}>
          <Grid container>
            <Grid
              container
              direction="row"
              style={{ marginLeft: "40px", marginRight: "40px" }}
            >
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
                  style={{
                    textTransform: "none",
                    color: "#FFFFFF",
                    fontSize: "medium",
                  }}
                >
                  <AddCircleIcon style={{ color: "#6FCF97" }} /> &nbsp;New track
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
            <Grid
              container
              direction="row"
              style={{ marginLeft: "40px", marginRight: "40px" }}
            >
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
                      duration={this.props.duration}
                      id={'origin-waveform'}
                      onZoomFinish={this.onZoomFinish}
                      onScroll={this.onScroll}
                      tracks={this.props.tracks}
                      onTrackSelecting={(e) => this.handleTrackSelecting(e)}
                      trackselecting={this.props.selectedTrackId}
                      handleUpdateXScroll={(e) => this.handleUpdateXScroll(e)}
                      selectedttsList={this.props.selectedttsList}
                      tts={this.props.tts}
                      getTTSDuration={(e) => this.props.getTTSDuration(e)}
                      xScroll={this.state.xScroll}
                    />
                  )}
                </div>
              </Grid>
            </Grid>
            <GridList
              style={{width:"100%", height:"20vh", marginRight:"40px"}}
            >  
              {this.props.tracks.map((track) => ( 
                <TrackItem
                  key={track.localTrackId}
                  test={track.test}
                  localTrackId={track.localTrackId}
                  name={track.name}
                  backendId={track.backendId}
                  onDeleteTrack={(e, f) => this.onDeleteTrack(e, f)}
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
                  duration={this.props.duration}
                  trackselecting={this.props.selectedTrackId}
                  ttsList={track.audioClips}
                  text={this.props.text}
                  onNameChange={this.props.onNameChange}
                  selectedWaveId={this.props.selectedWaveId}
                  fullLength={this.state.fullLength}
                  offset={this.offset}
                  xScroll={this.state.xScroll}
                />
              ))}
            </GridList>
          </Grid>
        </div>
      </center>
    );
  }
}

export default TrackSection;
