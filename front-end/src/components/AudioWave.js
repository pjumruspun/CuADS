import React, { useEffect, useRef, useState } from 'react';
import { Grid } from '@material-ui/core';
import WaveSurfer from 'wavesurfer.js';
import * as TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js';
import RegionPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min.js';

const formWaveSurferOptions = (ref) => ({
  container: ref,
  waveColor: '#ffffff',
  progressColor: '#ffffff',
  cursorColor: '#F2C94C',
  barWidth: 3,
  barRadius: 3,
  responsive: true,
  height: 80,
  normalize: true,
  // Use the PeakCache to improve rendering speed of large waveforms.
  partialRender: true,
   plugins: [
    RegionPlugin.create(),
    //  TimelinePlugin.create({
    //     container: ref
    //  })
  ]
 
});

export default function AudioWave(props) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  //const [playing, setPlay] = useState(false);
  //const [zoom, setZoom] = useState(50);
  // create new WaveSurfer instance
  // On component mount and when url changes

  const { id, onZoomFinish } = props;

  const componentDidMount = () => {
    const waveSurfer = wavesurfer.current;
    const wave = document.getElementById(id ? id : 'waveform').firstChild
    //console.log(wave)
    wave.addEventListener('scroll', function(e) {
      //console.log(waveSurfer.drawer.getScrollX())
      props.handleUpdateXScroll(waveSurfer.drawer.getScrollX());
    })
  };

  useEffect(() => {
    //setPlay(false);

    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);
    if (props.url == undefined) {
      wavesurfer.current.load(
        'https://reelcrafter-east.s3.amazonaws.com/aux/test.m4a'
      );
    } else {
      wavesurfer.current.load(props.url);
    }
    wavesurfer.current.on('ready', function () {
      // https://wavesurfer-js.org/docs/methods.html
      // wavesurfer.current.play();
      // setPlay(true);
      //	wavesurfer.drawBuffer();
      // make sure object stillavailable when file loaded
      if (wavesurfer.current) {
        wavesurfer.current.setVolume(0);
      }
      var timeline = Object.create(WaveSurfer.Timeline);

      timeline.init({
        wavesurfer: wavesurfer.current,
        container: '#waveform-timeline'
      });
    });

    // Removes events, elements and disconnects Web Audio nodes.
    // when component unmount
    return () => wavesurfer.current.destroy();
  }, [props.url]);

  useEffect(() => {
    componentDidMount();
  }, [props.xScroll]);

  useEffect(() => {
    const waveSurfer = wavesurfer.current;
    if (waveSurfer) waveSurfer.zoom(props.zoom);
    if (id) {
      onZoomFinish();
    }
  }, [props.zoom]);

  useEffect(() => {
    wavesurfer.current.playPause();
  }, [props.playing]);

  useEffect(() => {
    const waveSurfer = wavesurfer.current;
    if (props.playing) {
      waveSurfer.play(props.played);
    }
  }, [props.played]);

  return (
    <div>
      <div 
        style={{ height: 80 }} 
        id={id ? id : 'waveform'} 
        ref={waveformRef} 
      />
    </div>
  );
}
