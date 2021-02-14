import React, { Component, useState } from "react";
import { Grid } from "@material-ui/core";
import { ListItem } from '@material-ui/core';
import Button from "@material-ui/core/Button";



class TrackItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: '',
            name: '',
        }
    }

    onDeleteTrack = (e) =>{
        track_items.splice(e,1)
      };

    render(){

    return(
        <Grid container direction="row">
            <Grid item direction="column">
            Hello 
            </Grid>
            <button onClick={this.onDeleteTrack}>Delete</button>
        </Grid>
        );
}}


export default TrackItem ;