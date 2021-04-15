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
import Waveform from "./components//Wave";
import TrackSection from "./components/TrackSection";

var rootStyle = {
  backgroundColor: "#2e2d2d",
  color: "white",
};

const ZOOM_RANGE = {
  min: 20,
  max: 200,
};

var topTextEmptyProject =
  "No project opened, please create a new project or open an existing project from File menu.";

var roundToOneDecimal = (number) => {
  return Math.round(number * 10) / 10;
};

var canPlayTTS = true;
var timeBetweenEachTTS = 300; // in milliseconds

// To not play TTS too repeatedly, we allow playing TTS once every `timeBetweenEachTTS` ms
var playTTS = (base64string) => {
  if (!canPlayTTS) return; // Not ready to play sound
  canPlayTTS = false;

  // Play sound here
  var snd = new Audio("data:audio/wav;base64," + base64string);
  snd.play();

  setTimeout(function () {
    // Will be ready to play sound in `timeBetweenEachTTS` ms
    canPlayTTS = true;
  }, timeBetweenEachTTS);
};

class App extends Component {
  state = {
    playing: false,
    url: "",
    audioURL: "",
    played: 0.5,
    duration: 0,
    volume: 0.8,
    trackvolume: 50,
    speed: 1.0,
    zoom: 50,
    projectId: "",
    text: "",
    topText: topTextEmptyProject,
    playedSeconds: 0.0,
    ttsList: [],
    tracks: [],
    id: 0,
    localTrackId: 0,
    selectedTrackId: undefined,
  };

  handleTTSDelete = (id) => {
    console.log("app.js: should delete", id);
    const filteredTTSList = this.state.ttsList.filter((tts) => tts._id !== id);
    this.setState({ ttsList: filteredTTSList });
  };

  handleUrlChange = (url) => {
    console.log(`New url: ${url}`);
    this.setState({ url: url });
  };

  handleAudioURLChange = (audioURL) => {
    console.log(`New audio url: ${audioURL}`);
    this.setState({ audioURL: audioURL });
  };

  handleSeekMouseDown = (e) => {
    console.log(e.target.value);
    this.setState({ seeking: true, playing: false });
  };

  handleSeekChange = (e) => {
    console.log(parseFloat(e.target.value));
    this.player.seekTo(parseFloat(e.target.value));
    this.setState({ played: parseFloat(e.target.value) });
  };

  handleSeekMouseUp = (e) => {
    console.log(parseFloat(e.target.value));
    this.setState({ seeking: false, playing: true });
    this.player.seekTo(parseFloat(e.target.value));
  };

  handleProgress = (state) => {
    if (!this.state.seeking) {
      this.setState(state);
      const roundedPlayedSeconds = roundToOneDecimal(state.playedSeconds);
      this.handlePlayTTSOnTimeStamp(roundedPlayedSeconds);
      this.setState({ playedSeconds: state.playedSeconds });
    }
  };

  handlePlayTTSOnTimeStamp = (roundedPlayedSeconds) => {
    if (!this.state.playing) return;

    this.state.ttsList.map((tts) => {
      // Still not playing for some reason
      // Time sometimes still skips, like from 0.2 then suddenly 0.5
      const ttsRoundedStartTime = roundToOneDecimal(tts.startTime);

      if (Math.abs(ttsRoundedStartTime - roundedPlayedSeconds) < 0.01) {
        const base64string = tts.content;
        playTTS(base64string);
      }
    });
  };

  findByStartTime = (roundedStartTime) => {};

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

  handleSelected = (e, f, g) => {
    this.setState({ trackvolume: e, speed: f, text: g });
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
    this.handleAudioURLChange(project.originalAudioURL);
    this.fetchTTS();
    this.updateTracks();
  };

  handleTrackSelection = (trackId) => {
    if (trackId != 99) {
      this.setState({ selectedTrackId: trackId });
    } else {
      this.setState({ selectedTrackId: undefined });
    }
  };

  fetchTTS = () => {
    // Might need to deal with track later
    // Currently get all TTS in backend into the project
    axios.get(`http://localhost:3001/audio-clips`).then((res) => {
      const ttsList = res.data;
      // We keep the whole tts object in list
      // This could be optimized with mapping
      // For example, we wanna search tts content by time, so we map startTime -> content
      this.setState({ ttsList: ttsList });
    });
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

  handleImportProject = (videoId, videoFile) => {
    if (this.state.projectId == "") {
      alert(
        `You have no currently active project, please create a new project or open an existing project.`
      );
      return;
    }

    // Update mongo with file id
    const videoUrl = `http://localhost:3001/files/${videoId}`;
    console.log(videoUrl);
    this.handleUrlChange(videoUrl);
    axios
      .put(`http://localhost:3001/projects/${this.state.projectId}`, {
        videoURL: videoUrl,
      })
      .then((res) => {
        console.log(
          `res after changing videoURL in handleImportProject: ${res.data}`
        );

        var formData = new FormData();
        formData.append("files", videoFile);

        return axios.post(
          `http://localhost:3001/audio-utility/convert/${this.state.projectId}`,
          formData,
          { headers: { ContentType: "multipart/formdata" } }
        );
      })
      .then((res) => {
        console.log(`final res in handleImportProject: ${res.data}`);
        this.handleAudioURLChange(res.data.originalAudioURL);
      });

    //
  };

  updateTracks = () => {
    axios
      .get(
        `http://localhost:3001/projects/getalltracks/${this.state.projectId}`
      )
      .then((response) => {
        const trackIdList = response.data;
        this.setState({ tracks: [] });
        trackIdList.map((trackId) => {
          axios
            .get(`http://localhost:3001/tracks/findbyid/${trackId}`)
            .then((res) => {
              this.state.tracks.push({
                backendId: res.data._id,
                id: this.state.localTrackId,
              });
              this.setState({ localTrackId: this.state.localTrackId + 1 });
            });
        });

        return console.log(this.state.tracks);
      });
  };

  ref = (player) => {
    this.player = player;
  };

  onChange(field, value) {
    // parent class change handler is always called with field name and value
    this.setState({ [field]: value });
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
      zoom,
      text,
      audioURL,
      id,
      ttsList,
    } = this.state;

    return (
      <div className="App" style={rootStyle}>
        <Bar
          onVolumeChange={(value) => this.handleVolumeChange(value)}
          onURLChange={(url) => this.handleUrlChange(url)}
          onProjectChange={(project) => this.handleProjectChange(project)}
          onSaveProject={() => this.handleSaveProject()}
          onImport={(videoId, videoFile) =>
            this.handleImportProject(videoId, videoFile)
          }
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
            <ScriptBox
              trackvolume={trackvolume}
              speed={speed}
              text={text}
              onChange={this.onChange.bind(this)}
              playedSeconds={this.state.playedSeconds}
              selectedTrackId={this.state.selectedTrackId}
              onTTSGenerated={this.fetchTTS}
              onCreateTTS={(e) => this.handleTTS(e)}
            />
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

        <TrackSection
          url={audioURL}
          trackvolume={trackvolume}
          speed={speed}
          zoom={zoom}
          text={text}
          playing={playing}
          played={duration * played}
          onSelected={this.handleSelected}
          handleTTSDelete={this.handleTTSDelete}
          tts={ttsList}
          projectId={this.state.projectId}
          updateTracks={this.updateTracks}
          tracks={this.state.tracks}
          onSelectTrack={this.handleTrackSelection}
          localTrackId={this.state.localTrackId}
        />
        <div id="zoom">
          zoom
          <input
            type="range"
            value={zoom}
            onChange={(e) => this.setState({ zoom: e.target.value })}
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
