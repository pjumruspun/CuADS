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
import axios from "axios";

import TrackSection from "./components/TrackSection"

var rootStyle = {
  backgroundColor: "#2e2d2d",
  color: "white",
  
};

const ZOOM_RANGE = {
  min: 20,
  max: 200
};

var topTextEmptyProject =
  "No project opened, please create a new project or open an existing project from File menu.";

class App extends Component {
  state = {
    playing: false,
    url:
      "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    played: 0.5,
    duration: 0,
    volume: 0.8,
    trackvolume:50,
    speed:1.0,
    zoom:50,
    projectId: "",
    topText: topTextEmptyProject,
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
    console.log("volume change " + e);
    this.setState({ volume: parseFloat(e) });
  };
  
  handleSelected = (e,f) => {
    this.setState({ trackvolume: e,speed:f });
  };


  handleProjectChange = (project) => {
    console.log(`change project id to: ${project._id}`);
    var topTextToSet =
      project._id == "" ? topTextEmptyProject : `Project Name: ${project.name}`;
    this.setState({
      projectId: project._id,
      topText: topTextToSet,
    });
    // Also need to update URL and other stuff
    this.handleUrlChange(project.videoURL);
  };

  handleSaveProject = () => {
    if (this.state.projectId == "") {
      alert(
        `You have no currently active project, please create a new project or open an existing project.`
      );
      return;
    }
    console.log(
      `saving url=${this.state.url}, projectId=${this.state.projectId}`
    );

    axios
      .put(`http://localhost:3001/projects/${this.state.projectId}`, {
        videoURL: this.state.url,
      })
      .then((res) => {
        console.log(res);
      });
  };

  ref = (player) => {
    this.player = player;
  };

  onChange(field, value) {
        // parent class change handler is always called with field name and value
        this.setState({[field]: value});
    }
  
  render() {

    const {
      url,
      played,
      duration,
      playing,
      volume,
      topText,
      projectId,
      trackvolume,
      speed,
      zoom
    } = this.state;

    return (
      <div className="App" style={rootStyle}>
        <Bar
          onVolumeChange={(value) => this.handleVolumeChange(value)}
          onURLChange={(url) => this.handleUrlChange(url)}
          onProjectChange={(project) => this.handleProjectChange(project)}
          onSaveProject={() => this.handleSaveProject()}
        />
        <header>
          <p>{topText}</p>
        </header>
        <Grid
          container
          direction="row"
          alignItems="flex-start"
          justify="space-around"
        >
          <div>
            <ScriptBox trackvolume={trackvolume} speed={speed} onChange={this.onChange.bind(this)}/>
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
	
        <TrackSection trackvolume={trackvolume} speed={speed} zoom={zoom} playing={playing} played={duration * played} onSelected={this.handleSelected}/>
 
	<div id="zoom">
          zoom
          <input
            type="range"
            value={zoom}
            onChange={e => this.setState({ zoom: e.target.value })}
            min={ZOOM_RANGE.min}
            max={ZOOM_RANGE.max}
            step="10"
          ></input>
    </div>
	</div>
    );
  }
}

export default App;
