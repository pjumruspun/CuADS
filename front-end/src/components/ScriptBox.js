import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import AddIcon from "@material-ui/icons/AddRounded";
import RemoveIcon from "@material-ui/icons/RemoveRounded";
import axios from "axios";

var rootStyle = {
  backgroundColor: "#333333",
  display: 'flex',
  height: "100%",
  width:"100%"
};

class ScriptBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      volume: 50,
      speed: 1.0,
      pitch: "1.0",
      text: "",
      starttime: "",
      source: "chula",
    };
  }

  rmVolume = () => {
    if (this.state.volume != 0 && this.props.selectedWaveId === -1) {
      this.setState(prevState => ({
        volume: prevState.volume - 5
      }));
    }
    if (this.props.trackvolume != 0) {
      const fieldName = "trackvolume";
      const fieldValue = this.props.trackvolume - 5;
      this.props.onChange(fieldName, fieldValue);
    }
  };

  addVolume = () => {
    if (this.state.volume != 100 && this.props.selectedWaveId === -1) {
      this.setState(prevState => ({
        volume: prevState.volume + 5
      }));
    }
    if (this.props.trackvolume != 100) {
      const fieldName = "trackvolume";
      const fieldValue = this.props.trackvolume + 5;
      this.props.onChange(fieldName, fieldValue);
    }
  };

  rmSpeed = () => {
    if (this.state.speed != 0.25 && this.props.selectedWaveId === -1) {
      this.setState(prevState => ({
        speed: prevState.speed - 0.25
      }));
    }
    else if (this.props.speed != 0.25) {
      const fieldName = "speed";
      const fieldValue = this.props.speed - 0.25;
      this.props.onChange(fieldName, fieldValue);
    }
  };

  addSpeed = () => {
    if (this.state.speed != 2.0 && this.props.selectedWaveId === -1) {
      this.setState(prevState => ({
        speed: prevState.speed + 0.25
      }));
    }
    else if (this.props.speed != 2.0) {
      const fieldName = "speed";
      const fieldValue = this.props.speed + 0.25;
      this.props.onChange(fieldName, fieldValue);
    }
  };

  handleText = (e) => {
    this.setState({ text: e });
    const fieldName = "text";
    const fieldValue = e;
    this.props.onChange(fieldName, fieldValue);
  };

  handleSource = (e) => {
    this.setState({ source: e });
    const fieldName = "ttsSource";
    const fieldValue = e;
    this.props.onChange(fieldName, fieldValue);
  };

  generateTTS = () => {
    const tts_id = this.props.selectedWaveId;
    const trackId = this.props.selectedTrackId;
    var ttsFormData = {}; 

    if (trackId === undefined) {
      alert("Please select a track to add TTS first.");
      return;
    }

    if (tts_id === -1) {
      const text = this.state.text;
      const source = this.state.source;
      const speed = this.state.speed;
      const playedSeconds = this.props.playedSeconds;
      const volume = this.state.volume;
  
      ttsFormData = {
        text: text,
        source: source,
        trackId: trackId,
        speed: speed,
        volume: volume,
        startTime: playedSeconds,
      };
          
      axios
        .post(`http://localhost:3001/tts`, ttsFormData, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          console.log(response);
          this.props.onTTSGenerated("create", response.data, -1);
          this.setState({ text: "" });
          this.props.updateTrackSelectedAtApp(false);
          console.log(
            `Generated TTS with sentence '${text}' at ${playedSeconds} seconds`
          );
          // continue
        })
        .catch((response) => {
          alert(`ERROR.\nFailed to generate TTS from ${source}`);
        });
    } else {
      const text = this.props.text;
      const source = this.props.ttsSource;
      const speed = this.props.speed;
      const volume = this.props.trackvolume;
  
      ttsFormData = {
        text: text,
        source: source,
        trackId: trackId,
        speed: speed,
        volume: volume,
      };
  
      axios
        .patch(`http://localhost:3001/tts/${tts_id}/`, ttsFormData, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          this.props.onTTSGenerated("update", {}, tts_id);
          this.props.updateTrackSelectedAtApp(false);
          console.log(
            `Updated TTS with sentence ${text} with source ${source}`
          );
        })
        .catch((response) => {
          alert(`ERROR.\nFailed to update TTS.`);
        });
    }
  };

  render() {
    return (
      <div align="left" style={rootStyle}>
        <Grid
          container
          direction="column"
          justify="space-around"
          alignItems="flex-start"
          style={{ padding: "12px" }}
        >
          <div style={{width:'100%' }}>
            <div style={{ marginBottom: "12px"}}><b>Script:</b></div>
            <InputBase
              multiline
              rows={3}
              inputProps={{ "aria-label": "naked" }}
              value={this.props.selectedWaveId === -1 ? this.state.text : this.props.text}
              onChange={(event) => this.handleText(event.target.value)}
              style={{
                backgroundColor: "#F2F2F2",
                width: "100%",
                marginBottom: "12px",
                fontFamily: "'Sarabun', san-serif",
              }}
            />
          </div>
          <div style={{ marginBottom: "12px" }}><b>Time:</b></div>
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="flex-start"
          >
            <div style={{ marginRight: "10px", marginBottom: "12px" }}>
              From:
            </div>
            <InputBase
              inputProps={{ "aria-label": "naked" }}
              style={{
                backgroundColor: "#F2F2F2",
                height: "2vh",
                width: "7vw",
                marginRight: "10px",
                marginBottom: "10px",
              }}
              value={this.props.selectedWaveId === -1 ? this.props.playedSeconds : this.props.ttsStartTime.toFixed(6)}
            />
            <div style={{ marginRight: "10px", marginBottom: "12px" }}>To:</div>
            <InputBase
              inputProps={{ "aria-label": "naked" }}
              style={{
                backgroundColor: "#F2F2F2",
                height: "2vh",
                width: "7vw",
                marginRight: "10px",
                marginBottom: "10px",
              }}
              value={this.props.selectedWaveId === -1 ? "" : (this.props.ttsStartTime + this.props.ttsDuration).toFixed(6)}
            />
          </Grid>
          <div style={{ marginBottom: "8px", direction: "row" }}>
            <b>Adjustment:</b>
          </div>
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="flex-start"
          >
            <div style={{ marginRight: "12px" }}>
              <div style={{ marginRight: "10px", marginBottom: "18px" }}>
                Volume:
              </div>
              <div style={{ marginRight: "10px", marginBottom: "23px" }}>
                Speed:
              </div>
              <div style={{ marginRight: "10px", marginBottom: "10px" }}>
                Source:
              </div>
            </div>
            <div>
              <Grid
                container
                direction="row"
                style={{ marginBottom: "3px", alignItems: "center" }}
              >
                <Button onClick={this.rmVolume}>
                  <RemoveIcon style={{ color: "#F2F2F2" }} />
                </Button>
                <input
                  type="text"
                  placeholder="Volume"
                  value={this.props.selectedWaveId === -1 ? `${this.state.volume}%` : `${this.props.trackvolume}%`}
                  class="input-box"
                  style={{ backgroundColor: "#F2F2F2", width: "3vw" }}
                />
                <Button onClick={this.addVolume}>
                  <AddIcon style={{ color: "#F2F2F2" }} />
                </Button>
              </Grid>
              <Grid
                container
                direction="row"
                style={{ marginBottom: "11px", alignItems: "center" }}
              >
                <Button onClick={this.rmSpeed}>
                  <RemoveIcon style={{ color: "#F2F2F2" }} />
                </Button>
                <input
                  type="text"
                  placeholder="Speed"
                  value={this.props.selectedWaveId === -1 ? `x${this.state.speed}` : `x${this.props.speed}`}
                  class="input-box"
                  style={{ backgroundColor: "#F2F2F2", width: "3vw" }}
                />
                <Button onClick={this.addSpeed}>
                  <AddIcon style={{ color: "#F2F2F2" }} />
                </Button>
              </Grid>
              <Grid
                container
                direction="row"
                style={{ marginBottom: "11px", alignItems: "center" }}
              >
                <Select
                  value={this.props.selectedWaveId === -1 ? this.state.source : this.props.ttsSource}
                  onChange={(event) => this.handleSource(event.target.value)}
                  style={{
                    color: "#00",
                    backgroundColor: "#F2F2F2",
                    padding: "0px 6px",
                    marginLeft: "45px",
                    width: "90px",
                  }}
                >
                  <MenuItem value={"chula"}>Chula</MenuItem>
                  <MenuItem value={"google"}>Google</MenuItem>
                </Select>
              </Grid>
            </div>
          </Grid>
          <Button
            variant="contained"
            style={{ alignSelf: "flex-end", textTransform: "initial", borderRadius: 0, fontSize: "medium"}}
            onClick={this.generateTTS}
	    disabled={this.props.playing}
          >
            <b>{this.props.selectedWaveId === -1 ? "Generate TTS" : "Update TTS"}</b>
          </Button>
        </Grid>
      </div>
    );
  }
}
export default ScriptBox;
