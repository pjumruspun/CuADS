import React, { Component, useState } from "react";
import { Grid, InputBase } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Waveform from "./Wave";
import HorizontalScroller from "react-horizontal-scroll-container";
import axios from "axios";
class TrackItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      localTrackId: this.props.localTrackId,
      backendId: this.props.backendId,
      name: this.props.name,
      border: "thin solid #4F4F4F",
      trackselected: false,
      ttsid: 0,
      ttsList:[]
    };
    this.handleTTSDelete = props.handleTTSDelete;
    this.handlefetchTTS(this.props.ttsList)
  };

  handlefetchTTS =(e) => {
	e.map((id) => {
		axios.get(`http://localhost:3001/audio-clips/findbyid/${id}`).then((res) => {
     			 const tts = res.data;
      			 this.setState((prevState) => ({ttsList: [...prevState.ttsList, tts]}));
		});
	});
  };
  handleTrackSelected = () => {
    if (!this.state.trackselected && (this.props.trackselecting ==undefined)) {
      this.setState({ border: "5px solid white", trackselected: true });
      console.log(
        `selecting: ${this.state.backendId} name: ${this.state.name}`
      );
      this.props.onTrackSelecting({
        localTrackId: this.state.localTrackId,
        backendId: this.state.backendId,
	ttsList: this.state.ttsList
      });
    }
    if (this.state.trackselected) {
      this.setState({ border: "thin solid #4F4F4F", trackselected: false });
      this.props.onTrackSelecting({ localTrackId: 99, backendId: 99 ,ttsList:[] });
    }
  };
  handleNameChange = (e) => {
    const name = e.target.value;
    this.setState({ name: name });
    this.props.onNameChange(this.state.localTrackId, name); // Change name in App.js track list
  };
  render() {
    var onDeleteTrack = this.props.onDeleteTrack;
    return (
      <Grid
        container
        direction="row"
        style={{ height: "12vh", width: "100%", marginLeft:"40px", marginRight:'40px'}}
      >
        <Grid
          item
          xs={3}
          direction="column"
          onClick={this.handleTrackSelected}
          style={{
            backgroundColor: "#333333",
            border: this.state.border,
            paddingTop: "10px",
            alignItems: 'left'
          }}
        >
          <InputBase
            inputProps={{ "aria-label": "naked" }}
            style={{
              backgroundColor: "#bababa",
            }}
            onChange={this.handleNameChange}
            value={this.state.name}
          />
          <Button onClick={() => this.props.onDeleteTrack(this.props.localTrackId,this.state.trackslected)} style={{minWidth:0, padding:0, marginLeft:"15px"}}>
            <DeleteIcon style={{ color: "EB5757" }} />
          </Button>
	<div>{`local id=${this.props.localTrackId} backendId=${this.props.backendId} name=${this.state.name} test=${this.props.test}`}</div>
        </Grid>
        <Grid
          item
          xs={9}
          direction="column"
          style={{
            backgroundColor: "#222222",
            border: this.state.border,
            height: "12vh",
          }}
        >
          <HorizontalScroller>
            {this.state.ttsList.map((tts) => (
              <Waveform
                id={tts._id}
                url={tts}
                selecting={this.props.selectedWaveId}
                onSelecting={(e) => this.props.onSelecting(e)}
                onSelected={(volume, speed, text) =>
                  this.props.onSelected(volume, speed, text)
                }
                handleTTSDelete={this.handleTTSDelete}
                trackvolume={this.props.trackvolume}
                speed={this.props.speed}
                text={this.props.text}
                zoom={this.props.zoom}
                playing={false}
                played={0}
                key={tts._id}
              />
            ))}
          </HorizontalScroller>
        </Grid>
      </Grid>
    );
  }
}

export default TrackItem;
