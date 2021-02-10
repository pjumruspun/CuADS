import React, { useEffect, useRef, useState} from "react";
import { Grid } from "@material-ui/core";
import WaveSurfer from "wavesurfer.js";

const formWaveSurferOptions = ref => ({
  container: ref,
  waveColor: "#ffffff",
  progressColor: "#ffffff",
  cursorColor: "#ffffff",
  barWidth: 3,
  barRadius: 3,
  responsive: true,
  height: 80,
  // If true, normalize by the maximum peak instead of 1.0.
  normalize: true,
  // Use the PeakCache to improve rendering speed of large waveforms.
  //partialRender: true
});

const ZOOM_RANGE = {
  min: 20,
  max: 200
};

export default function Waveform({url,trackvolume,speed}) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlay] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [zoom, setZoom] = useState(50);
  // create new WaveSurfer instance
  // On component mount and when url changes
  useEffect(() => {
    setPlay(false);

    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);

    wavesurfer.current.load(url);

    wavesurfer.current.on("ready", function() {
      // https://wavesurfer-js.org/docs/methods.html
      // wavesurfer.current.play();
      // setPlay(true);
      //	wavesurfer.drawBuffer();
      // make sure object stillavailable when file loaded
      if (wavesurfer.current) {
        wavesurfer.current.setVolume(trackvolume);
        setVolume(trackvolume);
      }
    });
     
    // Removes events, elements and disconnects Web Audio nodes.
    // when component unmount
  return () => wavesurfer.current.destroy();
  }, [url]);
  
  useEffect(() => {
    wavesurfer.current.setVolume(trackvolume);
    }, [trackvolume]);
  useEffect(() => {
    wavesurfer.current.setPlaybackRate(speed);
    }, [speed]);

   useEffect(() => {
    const waveSurfer = wavesurfer.current;
    if (waveSurfer) waveSurfer.zoom(zoom);
  }, [zoom]);
 const handlePlayPause = () => {
    setPlay(!playing);
    wavesurfer.current.playPause();
  };

  return (
    <div>
      <div className="controls">
        <button onClick={handlePlayPause}>{!playing ? "Play" : "Pause"}</button>
      </div>
      <div style={{border: '1px solid grey',height: 80 }} id="waveform" ref={waveformRef} />  
    <div id="zoom">
          zoom
          <input
            type="range"
            value={zoom}
            onChange={e => setZoom(e.target.value)}
            min={ZOOM_RANGE.min}
            max={ZOOM_RANGE.max}
            step="10"
          ></input>
        </div>
  </div>
  );
}
