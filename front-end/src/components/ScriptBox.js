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
  backgroundColor: "#141414",
  height: "52vh",
  width: "40vw",
};

class ScriptBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      volumn: 100,
      speed: "1",
      pitch: "1.0",
      text: "",
      starttime:"",
      source: "chula",
    };
  }

  rmVolume = () => {
    if (this.props.trackvolume != 0) {
      const fieldName = "trackvolume";
      const fieldValue = this.props.trackvolume - 5;
      this.props.onChange(fieldName, fieldValue);
    }
  };

  addVolume = () => {
    if (this.props.trackvolume != 100) {
      const fieldName = "trackvolume";
      const fieldValue = this.props.trackvolume + 5;
      this.props.onChange(fieldName, fieldValue);
    }
  };

  rmSpeed = () => {
    if (this.props.speed != 0.25) {
      const fieldName = "speed";
      const fieldValue = this.props.speed - 0.25;
      this.props.onChange(fieldName, fieldValue);
    }
  };

  addSpeed = () => {
    if (this.props.speed != 2.0) {
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
  };

  generateTTS = () => {
    const text = this.state.text;
    const source = this.state.source;
    const playedSeconds = this.props.playedSeconds; // value from App.js
    const tts_id = this.props.selectedWaveId;

    var ttsFormData = {
      text: text,
      source: source,
    };

    if (tts_id === -1) {
      ttsFormData.startTime = playedSeconds;      
      axios
        .post(`http://localhost:3001/tts`, ttsFormData, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          const tts_audio = response.data.audio;
          this.props.onTTSGenerated();
          console.log(
            `Generated TTS with sentence '${text}' at ${playedSeconds} seconds`
          );
          // continue
        })
        .catch((response) => {
          alert(`ERROR.\nFailed to generate TTS from ${source}`);
        });
    } else {
      axios
        .patch(`http://localhost:3001/tts/${tts_id}/`, ttsFormData, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          this.props.onTTSGenerated();
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
          <div>
            <div style={{ marginBottom: "12px" }}>Script:</div>
            <InputBase
              multiline
              rows={3}
              inputProps={{ "aria-label": "naked" }}
	      value={this.props.text}
              onChange={(event) => this.handleText(event.target.value)}
              style={{
                backgroundColor: "#bababa",
                width: "38vw",
                marginBottom: "12px",
              }}
            />
          </div>
          <div style={{ marginBottom: "12px" }}>Time:</div>
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
                backgroundColor: "#bababa",
                height: "2vh",
                width: "7vw",
                marginRight: "10px",
                marginBottom: "10px",
              }}
              value={this.props.playedSeconds}
            />
            <div style={{ marginRight: "10px", marginBottom: "12px" }}>To:</div>
            <InputBase
              inputProps={{ "aria-label": "naked" }}
              style={{
                backgroundColor: "#bababa",
                height: "2vh",
                width: "7vw",
                marginRight: "10px",
                marginBottom: "10px",
              }}
            />
          </Grid>
          <div style={{ marginBottom: "8px", direction: "row" }}>
            Adjustment:
          </div>
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="flex-start"
          >
            <div style={{ marginRight: "12px" }}>
              <div style={{ marginRight: "10px", marginBottom: "20px" }}>
                Volume:
              </div>
              <div style={{ marginRight: "10px", marginBottom: "25px" }}>
                Speed:
              </div>
              <div style={{ marginRight: "10px", marginBottom: "12px" }}>
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
                  <RemoveIcon style={{ color: "#bababa" }} />
                </Button>
                <input
                  type="text"
                  placeholder="Volume"
                  value={this.props.trackvolume + "%"}
                  class="input-box"
                  style={{ backgroundColor: "#bababa", width: "3vw" }}
                />
                <Button onClick={this.addVolume}>
                  <AddIcon style={{ color: "#bababa" }} />
                </Button>
              </Grid>
              <Grid
                container
                direction="row"
                style={{ marginBottom: "13px", alignItems: "center" }}
              >
                <Button onClick={this.rmSpeed}>
                  <RemoveIcon style={{ color: "#bababa" }} />
                </Button>
                <input
                  type="text"
                  placeholder="Speed"
                  value={"x" + this.props.speed}
                  class="input-box"
                  style={{ backgroundColor: "#bababa", width: "3vw" }}
                />
                <Button onClick={this.addSpeed}>
                  <AddIcon style={{ color: "#bababa" }} />
                </Button>
              </Grid>
              <Grid
                container
                direction="row"
                style={{ marginBottom: "13px", alignItems: "center" }}
              >
                <Select
                  value={this.state.source}
                  onChange={(event) => this.handleSource(event.target.value)}
                  style={{
                    color: "#00",
                    backgroundColor: "#bababa",
                    padding: "0px 6px",
                    marginLeft: "45px",
                    borderRadius: "5px",
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
            style={{ alignSelf: "flex-end" }}
            onClick={this.generateTTS}
          >
            Generate TTS
          </Button>
        </Grid>
      </div>
    );
  }
}
export default ScriptBox;
