import React, { Component, useState } from "react";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TrackItem from "./TrackItem";

var rootStyle = {
  backgroundColor: "#141414",
  height: "auto",
  width: "100vw",
  align: "bottom",
  marginBottom: "10vh",
};
class TrackSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      id: 0,
    };
  }

  onAddTrack = () => {
    this.setState((prevState) => ({
      tracks: [...prevState.tracks, prevState.id],
      id: prevState.id + 1,
    }));
  };

  onDeleteTrack = (id) => {
    this.setState((prevState) => ({
      tracks: prevState.tracks.filter((el) => el !== id),
    }));
  };

  render() {
    return (
      <div style={rootStyle}>
        <Grid container>
          <Grid container direction="row" style={{paddingLeft:'10px'}}>
            <Grid item xs={3} direction="column" style={{ alignContent:'left', backgroundColor: "#333333", height:'10vh',width:'10vw',border:'solid',borderWidth:'thin',borderColor:'#4F4F4F'}}>
              <Button onClick={this.onAddTrack} style={{textTransform: 'none',color:'#E0E0E0'}}>
                +new track
              </Button>
            </Grid>
            <Grid item xs={9} direction="column" style={{ backgroundColor: "#333333",height:'10vh',border:'solid',borderWidth:'thin',borderColor:'#4F4F4F'}}>
              time ruler section
            </Grid>
          </Grid>
          <Grid container direction="row" style={{paddingLeft:'10px'}}>
            <Grid item xs={3} direction="column" style={{ backgroundColor: "#333333",height:'10vh',width:'10vw',border:'solid',borderWidth:'thin',borderColor:'#4F4F4F'}}>
            video track
            </Grid>
             <Grid item xs={9} direction="column" style={{ backgroundColor: "#333333",height:'10vh',width:'10vw',border:'solid',borderWidth:'thin',borderColor:'#4F4F4F'}}>
            
            </Grid>
          </Grid>
          <Grid container direction="row" style={{paddingLeft:'10px'}}>
            <Grid item xs={3} direction="column" style={{ backgroundColor: "#333333",height:'10vh',width:'10vw',border:'solid',borderWidth:'thin',borderColor:'#4F4F4F'}}>
            audio track
            </Grid>
            <Grid item xs={9} direction="column" style={{ backgroundColor: "#333333",height:'10vh',width:'10vw',border:'solid',borderWidth:'thin',borderColor:'#4F4F4F'}}>
            </Grid>
          </Grid>
          {this.state.tracks.map((track) => (
              <TrackItem
                key={track}
                id={track}
                  onDeleteTrack={this.onDeleteTrack}
                />
              ))}
        </Grid>
      </div>
    );
  }
}

export default TrackSection;
