import React, { Component } from "react";
import ReactPlayer from "react-player";
import "./App.css";
import Duration from "./components/Duration";
import Bar from "./components/Bar";
import ScriptBox from "./components/ScriptBox";
import { Grid } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";

import TrackSection from "./components/TrackSection"

var rootStyle = {
  backgroundColor: "#2e2d2d",
  color: "white",
  height: "100vh",
};

class App extends Component {
  state = {
    playing: false,
    url:
      "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    played: 0,
    duration: 0,
    volume: 0.8,
  };

  handleUrlChange = (url) => {
    console.log(`New url: ${url}`);
    this.setState({ url: url });
  };

  handleSeekMouseDown = (e) => {
    this.setState({ seeking: true, playing: false });
  };

  handleSeekChange = (e) => {
    this.player.seekTo(parseFloat(e.target.value));
    this.setState({ played: parseFloat(e.target.value) });
  };

  handleSeekMouseUp = (e) => {
    this.setState({ seeking: false, playing: true });
    this.player.seekTo(parseFloat(e.target.value));
  };

  handleProgress = (state) => {
    if (!this.state.seeking) {
      this.setState(state);
    }
  };

  handlePlayButton = () => {
    this.setState({ playing: true });
  };

  handlePauseButton = () => {
    this.setState({ playing: !this.state.playing });
  };

  handleDuration = (duration) => {
    this.setState({ duration });
  };

  handleVolumeChange = (e) => {
    console.log(e);
    console.log("volume change " + e);
    this.setState({ volume: parseFloat(e) });
  };

  ref = (player) => {
    this.player = player;
  };

  render() {
    const { url, played, duration, playing, volume } = this.state;

    return (
      <div className="App" style={rootStyle}>
        <Bar
          onVolumeChange={(value) => this.handleVolumeChange(value)}
          onURLChange={(url) => this.handleUrlChange(url)}
        />
        <header>
          <p>Audio Description Project Main Page</p>
        </header>
        <Grid
          container
          direction="row"
          alignItems="flex-start"
          justify="space-around"
        >
          <div>
            <ScriptBox />
          </div>
          <div>
            <ReactPlayer
              ref={this.ref}
              className="react-player"
              url={url}
              playing={playing}
              volume={volume}
              onSeek={(e) => console.log("onSeek", e)}
              onDuration={this.handleDuration}
              onProgress={this.handleProgress}
              progressInterval={10}
            />

            <table className="Table-center">
              <tbody>
                <tr>
                  <th>Duration</th>
                  <td>
                    <Duration seconds={duration} />
                  </td>
                  <th>Elapsed</th>
                  <td>
                    <Duration seconds={duration * played} />
                  </td>
                </tr>
              </tbody>
            </table>

            <table className="Table-center">
              <tbody>
                <tr>
                  <IconButton onClick={this.handlePauseButton}>
                    {playing ? <PauseIcon /> : <PlayArrowIcon />}
                  </IconButton>
                </tr>
              </tbody>
            </table>
          </div>
        </Grid>
        <input
          className="Input-slider"
          margin="center"
          type="range"
          min={0}
          max={0.99999}
          step="any"
          value={played}
          onMouseDown={this.handleSeekMouseDown}
          onChange={this.handleSeekChange}
          onInput={this.handleSeekChange}
          onMouseUp={this.handleSeekMouseUp}
        />
        <TrackSection />
      </div>
    );
  }
}

export default App;
