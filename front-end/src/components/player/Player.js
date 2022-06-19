import React, { useState } from "react";
import ReactPlayer from "react-player";
import Grid from "@material-ui/core/Grid";
import PlayerControlBar from "./PlayerControlBar";

// Video Player Config
const [videoPlayerWidth, videoPlayerHeight] = ["90%", "90%"];
const progressInterval = 10;
const defaultMasterVolume = 0.8;

var rootStyle = {
  backgroundColor: "black",
  display: "flex",
  height: "100%",
  width: "60%",
};

// Video player
function Player() {
  const [player, setPlayer] = useState(null); // Main Player
  const [url, setUrl] = useState(
    // Url of the video playing
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  );
  const [playing, setPlaying] = useState(false); // Boolean if the video is playing
  const [played, setPlayed] = useState(0.0); // How much have the video played
  const [playedSeconds, setPlayedSeconds] = useState(0.0);
  const [seeking, setSeeking] = useState(false); // Is the video currently in seeking by user?
  const [volume, setVolume] = useState(defaultMasterVolume); // Master volume
  const [duration, setDuration] = useState(0.0);

  const ref = (player) => {
    setPlayer(player);
  };

  const handleSeek = (event) => {};

  const handleDuration = (duration) => {
    // Calls when video is loaded
    // duration: Length of the video in seconds
    setDuration(duration);
  };

  const handleProgress = (state) => {
    // Calls as the video plays
    // state: {
    //   playedSeconds (float): Seconds video have played
    //   played (float): Percentage video have played
    //   loadedSeconds (float): Seconds video have loaded
    //   loaded (float): Percentage video have loaded
    // }
    setPlayedSeconds(state.playedSeconds);
    setPlayed(state.played);
  };

  return (
    <div style={rootStyle}>
      <Grid container direction="column" alignItems="center">
        <ReactPlayer
          ref={ref}
          className="react-player"
          url={url}
          playing={playing}
          volume={volume}
          onSeek={handleSeek}
          onDuration={handleDuration}
          onProgress={handleProgress}
          progressInterval={progressInterval}
          width={videoPlayerWidth}
          height={videoPlayerHeight}
        ></ReactPlayer>
        <PlayerControlBar
          playing={playing}
          setPlaying={setPlaying}
          playedSeconds={playedSeconds}
          duration={duration}
        ></PlayerControlBar>
      </Grid>
    </div>
  );
}

export default Player;
