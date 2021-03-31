import React, { Component, useState } from "react";
import { Grid, InputBase } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Waveform from "./Wave";

class TrackItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      name: "",
    };
  }

  render() {
    var onDeleteTrack = this.props.onDeleteTrack;
    return (
      <Grid container direction="row" style={{paddingLeft:'10px', height:'12vh'}}>
        <Grid item xs={3} direction="column"style={{ backgroundColor: "#333333",border:'solid',borderWidth:'thin',borderColor:'#4F4F4F',paddingTop:'10px'}}>
          <InputBase
            inputProps={{ "aria-label": "naked" }}
            style={{
            backgroundColor: "#bababa",
            }}
          />
            <Button onClick={() => onDeleteTrack(this.props.id)}>
                <DeleteOutlineIcon style={{color:"EB5757"}} />
                {this.props.id}
            </Button>

        </Grid>
 	<Grid item xs={9} direction="column" style={{ backgroundColor: "#333333",border:'solid',borderWidth:'thin',borderColor:'#4F4F4F', height:'12vh'}}>
        <Grid
          container
          direction="row"
          alignItems="flex-start"
          justify="flex-start"
        >
         {this.props.tts.map((ttstrack) => (
         <Waveform  url={ttstrack} selecting={false} onSelecting={null} onSelected={null}  trackvolume={50} speed={1.0} zoom={1} playing={false} played={0}/> 
         ))}
	</Grid>
	</Grid>
      </Grid>
    );
  }
}

export default TrackItem;
