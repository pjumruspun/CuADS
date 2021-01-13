import React, { Component } from "react";
import ReactPlayer from "react-player";
import "./App.css";
import Duration from "./components/Duration";
import Bar from "./components/Bar";
import { Grid } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";

var rootStyle = {
  backgroundColor: "#2e2d2d",
  color: "white",
  height: "100vh",
};

class App extends Component {
  state = {
    playing: false,
    url: "test.mp4",
    played: 0,
    duration: 0,
  };

  handleUrlChange = (url) => {
    this.setState({ url: url });
  };

  handleSeekMouseDown = (e) => {
    console.log("down");
    this.setState({ seeking: true, playing: false });
  };

  handleSeekChange = (e) => {
    console.log("Change");
    this.player.seekTo(parseFloat(e.target.value));
    this.setState({ played: parseFloat(e.target.value) });
  };

  handleSeekMouseUp = (e) => {
    console.log("Up");
    this.setState({ seeking: false, playing: true });
    this.player.seekTo(parseFloat(e.target.value));
  };

  handleProgress = (state) => {
    console.log("onProgress", state);
    if (!this.state.seeking) {
      this.setState(state);
    }
  };

  handlePlayButton = () => {
    console.log("play");
    this.setState({ playing: true });
  };

  handlePauseButton = () => {
    console.log("pause toggle");
    this.setState({ playing: !this.state.playing });
  };

  handleDuration = (duration) => {
    console.log("onDuration", duration);
    this.setState({ duration });
  };

  ref = (player) => {
    this.player = player;
  };

  render() {
    const { url, played, duration, playing } = this.state;

    return (
      <div className="App" style={rootStyle}>
        <Bar />
        <header>
          <p>Audio Description Project Main Page</p>
        </header>
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="space-between"
        >
          <div></div>
          <div>
            <ReactPlayer
              ref={this.ref}
              className="react-player"
              url={url}
              playing={playing}
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
      </div>
    );
  }
}

export default App;
