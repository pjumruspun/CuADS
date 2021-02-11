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

export default function Waveform({url,trackvolume,speed,zoom,playing,played}) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  //const [playing, setPlay] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [border, setBorder] = useState('1px solid grey');
  const [selected, setSelected] = useState(false);
  //const [zoom, setZoom] = useState(50);
  // create new WaveSurfer instance
  // On component mount and when url changes
  useEffect(() => {
    //setPlay(false);

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

   useEffect(() => {
    wavesurfer.current.playPause();
   }, [playing]);
  
   useEffect(() => {
    const waveSurfer = wavesurfer.current;
	if(playing){
        waveSurfer.play(played);
	}
  }, [played]);
 
 const handleSelected = () => {
    if(!selected){
    setBorder('3px solid white');
    setSelected(true);}
    else{
    setBorder('1px solid grey');
    setSelected(false);}
  };

  return (
    <div>
      <div style={{border: border ,height: 80 }} onClick={handleSelected} id="waveform" ref={waveformRef} /> 
  </div>
  );
}
