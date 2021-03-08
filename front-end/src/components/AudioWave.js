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
  normalize: true,
  // Use the PeakCache to improve rendering speed of large waveforms.
  //partialRender: true
});

export default function AudioWave(props) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  //const [playing, setPlay] = useState(false);
  //const [zoom, setZoom] = useState(50);
  // create new WaveSurfer instance
  // On component mount and when url changes
  useEffect(() => {
    //setPlay(false);

    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);

    wavesurfer.current.load(props.url);

    wavesurfer.current.on("ready", function() {
      // https://wavesurfer-js.org/docs/methods.html
      // wavesurfer.current.play();
      // setPlay(true);
      //	wavesurfer.drawBuffer();
      // make sure object stillavailable when file loaded
      if (wavesurfer.current) {
        wavesurfer.current.setVolume(0);
      }
    });
     
    // Removes events, elements and disconnects Web Audio nodes.
    // when component unmount
  return () => wavesurfer.current.destroy();
  }, [props.url]);
  

   useEffect(() => {
    const waveSurfer = wavesurfer.current;
    if (waveSurfer) waveSurfer.zoom(props.zoom);
  }, [props.zoom]);

   useEffect(() => {
    wavesurfer.current.playPause();
   }, [props.playing]);
  
   useEffect(() => {
    const waveSurfer = wavesurfer.current;
	if(props.playing){
        waveSurfer.play(props.played);
	}
  }, [props.played]);
 
  return (
    <div>
      <div style={{height: 80 }} id="waveform" ref={waveformRef} /> 
  </div>
  );
}
