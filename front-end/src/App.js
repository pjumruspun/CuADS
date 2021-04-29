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
  backgroundColor: "#222222",
  color: "white",
  height: "100%",
};

const ZOOM_RANGE = {
  min: 0,
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
    zoom: 0,
    projectId: "",
    text: "",
    topText: topTextEmptyProject,
    playedSeconds: 0.0,
    ttsList: [],
    tracks: [],
    tracksToDelete: [],
    selectedttsList:[],
    id: 0,
    selectedWaveId: -1,
    localTrackId: 0,
    selectedTrackId: undefined,
  };

  handleTTSDelete = (id) => {
    console.log("app.js: should delete", id);
    const filteredTTSList = this.state.ttsList.filter((tts) => tts._id !== id);
    this.setState({ ttsList: filteredTTSList });
    this.fetchTracks();
  };

  handleScriptTextChange = (tts_id) => {
    this.setState({ selectedWaveId: tts_id });
    if (tts_id === -1) {
      this.setState({ text: "" });
    } else {
      const currentTTS = this.state.ttsList.find((tts) => {
        return tts._id === tts_id;
      });
      if (currentTTS) {
        this.setState({ text: currentTTS.text });
      } else {
        this.setState({ text: "" });
      }
    }
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

    this.state.selectedttsList.map((tts) => {
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
      project._id === "" ? topTextEmptyProject : `Project Name: ${project.name}`;
    this.setState({
      projectId: project._id,
      topText: topTextToSet,
    });
    // Also need to update URL and other stuff
    this.handleUrlChange(project.videoURL);
    this.handleAudioURLChange(project.originalAudioURL);
    //this.fetchTTS();
    this.fetchTracks();

    // Clear track deletion flags
    this.setState({ tracksToDelete: [],selectedTrackId: undefined,selectedWaveId: -1 });
  };

  handleTrackSelection = (trackId) => {
    if (trackId !== 99) {
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
  handleselectedTTS = (e) =>{
     this.setState({ selectedttsList: e });
  };
  handleSaveProject = () => {
    if (this.state.projectId === "") {
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
        return this.saveTracks();
      });
  };

  handleImportProject = (videoId, videoFile) => {
    if (this.state.projectId === "") {
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

  handleAddTrack = () => {
    let addTrackPromise = new Promise((resolve) => {
      this.setState((prevState) => ({
        tracks: [
          ...prevState.tracks,
          {
            localTrackId: prevState.localTrackId,
            name: "New Track",
            backendId: undefined,
          },
        ],
        localTrackId: prevState.localTrackId + 1,
      }));

      resolve();
    });

    addTrackPromise.then(() => {
      this.saveTracks();
      console.log("Added track");
      console.log(this.state.tracks);
    });
  };

  handleDeleteTrack = (localTrackId) => {
    console.log(`Trying to delete ${localTrackId}`);
    // mark track for delete
    this.state.tracks.map((track) => {
      if (track.localTrackId === localTrackId) {
        // push backendId for deletion if user saves project
        // but the track must have backendId (exist in database)
        if (track.backendId !== undefined) {
          this.state.tracksToDelete.push(track.backendId);
        }
      }
    });

    this.setState((prevState) => ({
      tracks: prevState.tracks.filter((el) => el.localTrackId !== localTrackId),
    }));

    this.saveTracks();
  };

  handleTrackNameChange = (localTrackId, name) => {
    console.log(`${localTrackId}, ${name}`);
    this.state.tracks.map((track) => {
      console.log(track);
      if (localTrackId === track.localTrackId) {
        console.log(`Found id=${localTrackId}`);
        track.name = name;
      }
    });

    this.saveTracks();
  };

  saveTracks = () => {
    console.log(`saving tracks...`);

    // We do promises here to give backend some time to update its database one by one
    // Otherwise some tracks might not be saved
    const savePromises = this.state.tracks.map((track, i) => {
      new Promise((resolve) => {
        setTimeout(() => {
          const backendId = track.backendId;
          const name = track.name;
	  const audioClips = track.audioClips;
          const trackFormData = {
            name: name,
	    audioClips:audioClips
          };

          if (backendId === undefined) {
            // not exist in database
            // save new track
            axios
              .post(
                `http://localhost:3001/tracks/${this.state.projectId}`,
                trackFormData,
                {
                  headers: { "Content-Type": "application/json" },
                }
              )
              .then((response) => {
                const backendId = response.data._id;
                // Update track's backendId
                track.backendId = backendId;
                console.log(
                  `successfully save track localId: ${track.localTrackId} backendId: ${backendId}`
                );
              });
          } else {
            // exist in database
            // try to update
            axios
              .put(`http://localhost:3001/tracks/${backendId}`, trackFormData)
              .then((res) => {
                console.log(
                  `successfully update track ${track.localTrackId}:${backendId} with name ${track.name}`
                );
              });
          }
          resolve(); // mark as resolved
        }, 20 * this.state.tracks.length - 20 * i); // total delay of saving in ms
      });
    });

    const deletePromises = this.state.tracksToDelete.map((backendId, i) => {
      new Promise((resolve) => {
        setTimeout(() => {
          // Delete tracks
          axios
            .delete(`http://localhost:3001/tracks/${backendId}`)
            .then((res) => {
              console.log(res.data);
              console.log(`successfully delete track ${backendId}`);
            });
          resolve(); // mark as resolved
        }, 20 * this.state.tracksToDelete.length - 20 * i); // total delay of deleting in ms
      });
    });

    Promise.all(savePromises)
      .then(() => {
        console.log("Saving done");
      })
      .then(() => {
        return Promise.all(deletePromises);
      })
      .then(() => {
        return console.log("Deleting done");
      });
  };

  fetchTracks = () => {
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
                name: res.data.name,
                localTrackId: this.state.localTrackId,
		audioClips: res.data.audioClips
              });
              this.setState({ localTrackId: this.state.localTrackId + 1 });
            });
        });
	this.setState({selectedTrackId: undefined,selectedWaveId: -1 });
	this.fetchTTS();
        // return console.log(this.state.tracks);
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
      selectedttsList
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
          {topText === topTextEmptyProject ? <p>{topText}</p> : <b><p>{topText}</p></b>}
        </header>
        <Grid
          container
          direction="row"
          alignItems="flex"
          justify="space-around"
          xs={12}
          style={{padding:"20px", display:"flex"}}
        >
          <div style={{width: '48%', margin: '10px'}}>
            <ScriptBox
              trackvolume={trackvolume}
              speed={speed}
              text={text}
              selectedWaveId={this.state.selectedWaveId}
              onChange={this.onChange.bind(this)}
              playedSeconds={this.state.playedSeconds}
              selectedTrackId={this.state.selectedTrackId}
              onTTSGenerated={this.fetchTracks}
            />
          </div>
          <div className="Video-block" style={{backgroundColor: 'black', width: '48%', margin: '10px'}}>
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
            <table className="Table-center">
              <center><tbody className="Table-body">
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
              </tbody></center>
            </table>

            <table className="Table-center">
              <center><tbody className="Table-body">
                <tr>
                  <IconButton onClick={this.handlePauseButton} style={{color: 'white'}}>
                    {playing ? <PauseIcon /> : <PlayArrowIcon />}
                  </IconButton>
                </tr>
              </tbody></center>
            </table>
          </div>
        </Grid>


        <TrackSection
          url={audioURL}
          trackvolume={trackvolume}
          speed={speed}
          zoom={zoom}
          text={text}
          playing={playing}
          played={duration * played}
          onSelected={(e,f,g)=>this.handleSelected(e,f,g)}
          handleTTSDelete={this.handleTTSDelete}
          tts={this.state.ttsList}
          setText={this.handleScriptTextChange}
          projectId={this.state.projectId}
          fetchTracks={this.fetchTracks}
          tracks={this.state.tracks}
          onSelectTrack={(e)=>this.handleTrackSelection(e)}
          localTrackId={this.state.localTrackId}
          onAddTrack={this.handleAddTrack}
          onNameChange={this.handleTrackNameChange}
          onDeleteTrack={this.handleDeleteTrack}
	  selectedTrackId={this.state.selectedTrackId}
          selectedWaveId={this.state.selectedWaveId}
	  setTTS={(e)=>this.handleselectedTTS(e)}
        />
        <div id="zoom" style={{textAlign: "right", padding: "10px 40px 10px 0px"}}>
          zoom &nbsp;
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
