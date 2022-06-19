import React, { useState } from "react";
import ReactPlayer from "react-player";
import PlayPauseButton from "./PlayPauseButton";
import Grid from "@material-ui/core/Grid";
import PlayerControlBar from "./PlayerControlBar";

// Video Player Config
const [videoPlayerWidth, videoPlayerHeight] = ["90%", "90%"];
const progressInterval = 10;

var rootStyle = {
  backgroundColor: "black",
  display: "flex",
  height: "100%",
  width: "60%",
};

function Player() {
  const [player, setPlayer] = useState(null); // Main Player
  const [url, setUrl] = useState(
    // Url of the video playing
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  );
  const [playing, setPlaying] = useState(false); // Boolean if the video is playing
  const [played, setPlayed] = useState(0); // How much have the video played
  const [seeking, setSeeking] = useState(false); // Is the video currently in seeking by user?
  const [volume, setVolume] = useState(0.8); // Master volume
  const [duration, setDuration] = useState(0);

  const ref = (player) => {
    setPlayer(player);
  };

  const handleSeek = (event) => {};

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  const handleProgress = (state) => {
    // state: {
    //   playedSeconds (float): Seconds video have played
    //   played (float): Percentage video have played
    //   loadedSeconds (float): Seconds video have loaded
    //   loaded (float): Percentage video have loaded
    // }
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
        ></PlayerControlBar>
      </Grid>
    </div>
  );
}

export default Player;
