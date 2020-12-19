import React, { Component } from "react";
import ReactPlayer from "react-player";
import "./App.css";
import Duration from "./components/Duration";

class App extends Component {
  state = {
    playing: false,
    url: "test.mp4",
    played: 0,
    duration: 0,
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
      <div className="App">
        <header>
          <p>Audio Description Project Main Page</p>
        </header>
        <ReactPlayer
          ref={this.ref}
          class="Video-preview"
          className="react-player"
          url={url}
          playing={playing}
          onSeek={(e) => console.log("onSeek", e)}
          onDuration={this.handleDuration}
          onProgress={this.handleProgress}
          progressInterval={10}
        />

        <table>
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

        <button onClick={this.handlePauseButton}>
          {playing ? "Pause" : "Play"}
        </button>

        <input
          class="Input-slider"
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
