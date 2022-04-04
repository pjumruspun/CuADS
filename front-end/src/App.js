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
import * as Tone from 'tone';

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

var normalizeSpeed = (speed) => {
  return ((speed/2)*0.5) + 0.85;
}

var normalizeVolume = (volume) => {
  return parseInt((volume/5)-10);
}

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
    zoom: 75,
    projectId: "",
    text: "",
    topText: topTextEmptyProject,
    playedSeconds: 0.0,
    ttsStartTime: 0,
    ttsDuration: 0,
    ttsSource: "chula",
    ttsList: [],
    tracks: [],
    tracksToDelete: [],
    selectedttsList: [],
    id: 0,
    selectedWaveId: -1,
    localTrackId: 0,
    selectedTrackId: undefined,
    ttsTransportMap: {},
    trackselected: false
  };

  loadTransportTTS = (ttsList = this.state.ttsList) => {
    ttsList.forEach((ttsItem) => {
      if (!(ttsItem._id in this.state.ttsTransportMap)) {
        const player = new Tone.Player("data:audio/wav;base64," + ttsItem.content);
        player.playbackRate = normalizeSpeed(ttsItem.speed);
        if((this.state.selectedttsList!= undefined)&&(this.state.selectedttsList.includes(ttsItem._id))){
          //alert(ttsItem.text+" play");
          player.volume.value = normalizeVolume(ttsItem.volume);
        }else{
          //alert(ttsItem.text+" silence");
          player.volume.value = -Infinity;
          player.volume.mute = true;
        }
        player.toDestination();
        player.sync().start(ttsItem.startTime);
        this.setState(prevState => ({
          ttsTransportMap: {
            ...prevState.ttsTransportMap,
            [ttsItem._id]: player
        }
        }));
      }else{
        this.createOrUpdateTransportTTS("update",ttsItem,ttsItem._id);
      }
    });
  }

  createOrUpdateTransportTTS = async (mode, ttsItem, tts_id) => {
    await this.fetchTTS(false);
    switch(mode) {
      case "create":
        this.loadTransportTTS();
        break;
      case "update":
        if((this.state.ttsTransportMap)[tts_id]!= undefined){
          (this.state.ttsTransportMap)[tts_id].dispose();
        }
        const response = await axios.get(`http://localhost:3001/audio-clips/findbyid/${tts_id}/`)
        const newPlayer = new Tone.Player("data:audio/wav;base64," + response.data.content);
        newPlayer.playbackRate = normalizeSpeed(response.data.speed);
        if((this.state.selectedttsList!= undefined)&&(this.state.selectedttsList.includes(ttsItem._id))){
          if(response.data.volume!=null){
            newPlayer.volume.value = normalizeVolume(response.data.volume);
          }
        }else{
          newPlayer.volume.value = -Infinity;
          newPlayer.volume.mute = true;
        }
        newPlayer.toDestination();
        if(response.data.startTime>=0){
          newPlayer.sync().start(response.data.startTime);
        }
        this.setState(prevState => ({
          ttsTransportMap: {
            ...prevState.ttsTransportMap,
            [tts_id]: newPlayer
          }
        }));
        break;
      default:
        break;
    }
  }

  handleTTSGenerated = (e) => {
    this.fetchTracks();
    this.createOrUpdateTransportTTS(e);
  }
  
  getTTSDuration = (id) => {
    const thisPlayer = (this.state.ttsTransportMap)[id]
    return thisPlayer.buffer.duration / thisPlayer.playbackRate;
  }

  handleTTSDelete = (id) => {
    console.log("app.js: should delete", id);
    const filteredTTSList = this.state.ttsList.filter((tts) => tts._id !== id);
    (this.state.ttsTransportMap)[id].dispose();
    let newTTSTransportMap = this.state.ttsTransportMap;
    delete newTTSTransportMap[id];
    this.setState({ ttsTransportMap: newTTSTransportMap });
    this.setState({ ttsList: filteredTTSList });
    this.fetchTracks();
    this.updateTrackSelectedAtApp(false);
  };

  handleScriptTextChange = (tts_id) => {
    this.setState({ selectedWaveId: tts_id });
    if (tts_id === -1) {
      this.setState({ text: '', speed: 1, trackvolume: 50 });
    } else {
      const currentTTS = this.state.ttsList.find((tts) => {
        return tts._id === tts_id;
      });
      if (currentTTS) {
        const duration = this.getTTSDuration(tts_id);
        this.setState({ text: currentTTS.text, ttsStartTime: currentTTS.startTime, ttsDuration: duration, speed: currentTTS.speed, trackvolume: currentTTS.volume, ttsSource: currentTTS.source });
      } else {
        this.setState({ text: '', speed: 1, trackvolume: 50 });
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

  handleSeekTTS = (e) => {
    Tone.Transport.seconds = e;
    Tone.Transport.start();
  }

  handleProgress = (state) => {
    if (!this.state.seeking) {
      this.setState(state);
      this.setState({ playedSeconds: state.playedSeconds });
    }
  };

  findByStartTime = (roundedStartTime) => {};

  handlePlayButton = () => {
    this.setState({ playing: true });
  };

  handlePauseButton = () => {
    if (this.state.playing) {
      Tone.Transport.pause();
    } else {
      Tone.Transport.start();
    }
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
      project._id === ""
        ? topTextEmptyProject
        : `Project Name: ${project.name}`;
    this.setState({
      projectId: project._id,
      topText: topTextToSet,
    });
    // Also need to update URL and other stuff
    this.handleUrlChange(project.videoURL);
    this.handleAudioURLChange(project.originalAudioURL);
    this.fetchTTS(true);
    this.fetchTracks();

    // Clear track deletion flags
    this.setState({
      tracksToDelete: [],
      selectedTrackId: undefined,
      selectedWaveId: -1,
    });
  };

  handleTrackSelection = async(trackId) => {
    if (trackId !== 99) {
      await this.setState({ selectedTrackId: trackId });
    } else {
      await this.setState({ selectedTrackId: undefined });
    }
  };

  handleselectedTTS = async(e) =>{
    if(e == undefined){
    await this.setState({ selectedttsList: [] });
    }
    await this.setState({ selectedttsList: e });
    console.log("currently selecting "+this.state.selectedttsList);
    this.loadTransportTTS();
  };

  fetchTTS = async (isFirst) => {
    // Might need to deal with track later
    // Currently get all TTS in backend into the project
    const response = await axios.get(`http://localhost:3001/audio-clips`);
    const ttsList = response.data;
    if (isFirst) {
      this.loadTransportTTS(ttsList);
    }
    // We keep the whole tts object in list
    // This could be optimized with mapping
    // For example, we wanna search tts content by time, so we map startTime -> content
    this.setState({ ttsList: ttsList });
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
    if (
      window.confirm(
        'Are you sure you want to delete this track ?'
      )
    ) {
    console.log(`Trying to delete ${localTrackId}`);
    // mark track for delete
    this.state.tracks.map((track) => {
      if (track.localTrackId === localTrackId) {
        // push backendId for deletion if user saves project
        // but the track must have backendId (exist in database)
	if(this.state.selectedTrackId == track.backendId){
	 this.setState({ selectedTrackId: undefined });
	}
	if(track.audioClips!=undefined){
	track.audioClips.map((id) => {
	if((this.state.ttsTransportMap)[id]!= undefined){
        (this.state.ttsTransportMap)[id].dispose();
	}
	const response = axios.delete(
      	`http://localhost:3001/audio-clips/${id}`
    	);
	});
	}
        if (track.backendId !== undefined) {
          this.state.tracksToDelete.push(track.backendId);
        }
      }
    });

    this.setState((prevState) => ({
      tracks: prevState.tracks.filter((el) => el.localTrackId !== localTrackId),
    }));

    this.saveTracks();
    }
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
            audioClips: audioClips,
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
                audioClips: res.data.audioClips,
              });
              this.setState({ localTrackId: this.state.localTrackId + 1 });
            });
        });
        this.setState({ selectedTrackId: undefined, selectedWaveId: -1 });
        this.fetchTTS();
        // return console.log(this.state.tracks);
      });
  };

  updateTrackSelectedAtApp = (e) => {
    this.setState({ trackselected: e })
  }

  ref = (player) => {
    this.player = player;
  };

  onChange(field, value) {
    // parent class change handler is always called with field name and value
    this.setState({ [field]: value });
  };

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
      selectedttsList,
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
          projectId={this.state.projectId}
        />
        <header>
          {topText === topTextEmptyProject ? (
            <p>{topText}</p>
          ) : (
            <b>
              <p>{topText}</p>
            </b>
          )}
        </header>
        <Grid
          container
          direction="row"
          alignItems="flex"
          justify="space-around"
          xs={12}
          style={{ padding: "20px", display: "flex" }}
        >
          <div style={{ width: "48%", margin: "10px" }}>
            <ScriptBox
              trackvolume={trackvolume}
              speed={speed}
              text={text}
	      playing={playing}
              selectedWaveId={this.state.selectedWaveId}
              onChange={this.onChange.bind(this)}
              ttsStartTime={this.state.ttsStartTime}
              ttsDuration={this.state.ttsDuration}
              ttsSource={this.state.ttsSource}
              playedSeconds={this.state.playedSeconds}
              selectedTrackId={this.state.selectedTrackId}
              onTTSGenerated={this.handleTTSGenerated}
              onCreateTTS={(e) => this.handleTTS(e)}
              updateTrackSelectedAtApp={(e) => this.updateTrackSelectedAtApp(e)}
            />
          </div>
          <div
            className="Video-block"
            style={{ backgroundColor: "black", width: "48%", margin: "10px" }}
          >
            <ReactPlayer
              ref={this.ref}
              className="react-player"
              url={url}
              playing={playing}
              volume={volume}
              onSeek={(e) => this.handleSeekTTS(e)}
              onDuration={this.handleDuration}
              onProgress={this.handleProgress}
              progressInterval={10}
              width="512px"
              height="288px"
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
              <center>
                <tbody className="Table-body">
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
              </center>
            </table>

            <table className="Table-center">
              <center>
                <tbody className="Table-body">
                  <tr>
                    <IconButton
                      onClick={this.handlePauseButton}
                      style={{ color: "white" }}
                    >
                      {playing ? <PauseIcon /> : <PlayArrowIcon />}
                    </IconButton>
                  </tr>
                </tbody>
              </center>
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
          duration={duration}
          played={duration * played}
          onSelected={(e, f, g) => this.handleSelected(e, f, g)}
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
          setTTS={(e) => this.handleselectedTTS(e)}
          getTTSDuration={(e) => this.getTTSDuration(e)}
          selectedttsList={this.selectedttsList}
          updateTrackSelectedAtApp={(e) => this.updateTrackSelectedAtApp(e)}
          trackselected={this.state.trackselected}
        />
        <div
          id="zoom"
          style={{ textAlign: "right", padding: "10px 40px 10px 0px" }}
        >
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
