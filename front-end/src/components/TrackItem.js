import React, { Component, useState } from 'react';
import { Grid, InputBase } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Waveform from './Wave';
import HorizontalScroller from 'react-horizontal-scroll-container';
class TrackItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      name: '',
      border: 'thin solid #4F4F4F',
      trackselected: false,
      ttsid: 0,
    };
    this.handleTTSDelete = props.handleTTSDelete;
  }
  handleTrackSelected = () => {
    if (!this.state.trackselected && this.props.trackselecting == 99) {
      this.setState({ border: '5px solid white', trackselected: true });
      this.props.onTrackSelecting(this.state.id);
    }
    if (this.state.trackselected) {
      this.setState({ border: 'thin solid #4F4F4F', trackselected: false });
      this.props.onTrackSelecting(99);
    }
  };
  render() {
    var onDeleteTrack = this.props.onDeleteTrack;
    return (
      <Grid
        container
        direction="row"
        style={{ paddingLeft: '10px', height: '12vh' }}
      >
        <Grid
          item
          xs={3}
          direction="column"
          onClick={this.handleTrackSelected}
          style={{
            backgroundColor: '#333333',
            border: this.state.border,
            paddingTop: '10px',
          }}
        >
          <InputBase
            inputProps={{ 'aria-label': 'naked' }}
            style={{
              backgroundColor: '#bababa',
            }}
          />
          <Button onClick={() => onDeleteTrack(this.props.id)}>
            <DeleteOutlineIcon style={{ color: 'EB5757' }} />
            {this.props.id}
          </Button>
        </Grid>
        <Grid
          item
          xs={9}
          direction="column"
          style={{
            backgroundColor: '#333333',
            border: this.state.border,
            height: '12vh',
          }}
        >
          <HorizontalScroller>
            {this.props.ttsList.map((tts) => (
              <Waveform
                id={tts._id}
                url={tts}
                selecting={this.props.selecting}
                onSelecting={(e) => this.props.onSelecting(e)}
                onSelected={(volume, speed, text) =>
                  this.props.onSelected(volume, speed, text)
                }
                handleTTSDelete={this.handleTTSDelete}
                trackvolume={this.props.trackvolume}
                speed={this.props.speed}
                text={this.props.text}
                zoom={this.props.zoom}
                playing={false}
                played={0}
                key={tts._id}
              />
            ))}
          </HorizontalScroller>
        </Grid>
      </Grid>
    );
  }
}

export default TrackItem;
