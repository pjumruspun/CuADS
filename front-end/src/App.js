import React, { Component } from "react";
import ReactPlayer from "react-player";
import "./App.css";

class App extends Component {
  state = {
    url: null,
    played: 0,
  };

  handleSeekMouseDown = (e) => {
    console.log("down");
    this.setState({ seeking: true });
  };

  handleSeekChange = (e) => {
    console.log("Change");
    this.setState({ played: parseFloat(e.target.value) });
  };

  handleSeekMouseUp = (e) => {
    console.log("Up");
    this.setState({ seeking: false });
    this.player.seekTo(parseFloat(e.target.value));
  };

  handleProgress = (state) => {
    console.log("onProgress", state);
    if (!this.state.seeking) {
      this.setState(state);
    }
  };

  ref = (player) => {
    this.player = player;
  };

  render() {
    const { url, played } = this.state;

    return (
      <div className="App">
        <header>
          <p>Audio Description Project Main Page</p>
        </header>
        <ReactPlayer
          ref={this.ref}
          className="react-player"
          url="test.mp4"
          onSeek={(e) => console.log("onSeek", e)}
        />
        <input
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
