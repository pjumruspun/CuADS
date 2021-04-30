import React, { useEffect, useRef, useState } from 'react';
import { Grid } from '@material-ui/core';
import WaveSurfer from 'wavesurfer.js';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';

const formWaveSurferOptions = (ref) => ({
  container: ref,
  waveColor: '#ffffff',
  progressColor: '#ffffff',
  cursorColor: '#ffffff',
  barWidth: 3,
  barRadius: 3,
  responsive: true,
  height: 80,
  normalize: true,
  interact: false,
  fillParent:true
  // Use the PeakCache to improve rendering speed of large waveforms.
  //partialRender: true
});

export default function Waveform(props) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  //const [playing, setPlay] = useState(false);
  const [volume, setVolume] = useState(50);
  const [speed, setSpeed] = useState(1.0);
  const [text, setText] = useState(props.text);
  const [border, setBorder] = useState('1px solid grey');
  const [selected, setSelected] = useState(false);
  const { id, handleTTSDelete, duration, url  } = props;
  //const [zoom, setZoom] = useState(50);
  // create new WaveSurfer instance
  // On component mount and when url changes

  const { startTime } = url;
  const styles = genStyle(duration, startTime);

  useEffect(() => {
    //setPlay(false);

    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);
    
    wavesurfer.current.load('data:audio/wav;base64,'+props.url.content);

    wavesurfer.current.on('ready', function () {
      // https://wavesurfer-js.org/docs/methods.html
      // wavesurfer.current.play();
      // setPlay(true);
      //	wavesurfer.drawBuffer();
      // make sure object stillavailable when file loaded
      if (wavesurfer.current) {
        wavesurfer.current.setVolume(0.5);
      }
    });

    // Removes events, elements and disconnects Web Audio nodes.
    // when component unmount
    return () => wavesurfer.current.destroy();
  }, [props.url]);

  useEffect(() => {
    if (selected) {
      wavesurfer.current.setVolume(props.trackvolume / 100);
      setVolume(props.trackvolume);
    }
  }, [props.trackvolume]);

  useEffect(() => {
    if (selected) {
      wavesurfer.current.setPlaybackRate(props.speed);
      setSpeed(props.speed);
    }
  }, [props.speed]);

  useEffect(() => {
    const waveSurfer = wavesurfer.current;
    if (waveSurfer) waveSurfer.zoom(props.zoom);
  }, [props.zoom]);

  useEffect(() => {
    wavesurfer.current.playPause();
  }, [props.playing]);

  useEffect(() => {
    if (selected) {
      setText(props.text);
    }
  }, [props.text]);

  const handleSelected = () => {
    if (!selected && props.selecting === -1) {
      setBorder('3px solid white');
      props.onSelected(volume, speed, text);
      setSelected(true);
      props.onSelecting(props.url._id);
    }
    if (selected) {
      setBorder('1px solid grey');
      setSelected(false);
      props.onSelecting(-1);
    }
  };

  const deleteTTS = async (id) => {
    if (
      window.confirm(
        'Are you sure you want to delete this tts ?'
      )
    ) {
    const response = await axios.delete(
      `http://localhost:3001/audio-clips/${id}`
    );
    console.log(response);
    if (response.status === 200) {
      handleTTSDelete(id);
      setBorder('1px solid grey');
      setSelected(false);
      props.onSelecting(-1);
    } else {
      alert('something is wrong with the server');
    }}
  };

  return (
    <div style={styles.waveContainer}>
      {selected && (
        <div
          style={styles.deleteButton}
          onClick={() => {
            deleteTTS(id);
          }}
        >
          <DeleteIcon style={{ color: 'EB5757' }} />
        </div>
      )}
      <div
        style={{ border: border, height: 80, width: 50 }}
        onClick={handleSelected}
        id="waveform"
        ref={waveformRef}
      />
    </div>
  );
}

const genStyle = (duration, startTime) => {
  const percentage = (startTime * 100) / duration;
  return {
    waveContainer: {
      position: 'absolute',
      left: `${percentage}%`,
    },
    deleteButton: {
      position: 'absolute',
      top: '0',
      right: '0',
      cursor: 'pointer',
      zIndex: '5',
    },
  };
};
