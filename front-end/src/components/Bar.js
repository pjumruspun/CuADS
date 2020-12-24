import React from 'react';
import FileButton from './FileButton.js';
import SettingButton from './SettingButton.js';
import { Grid } from "@material-ui/core";

export default function SimpleMenu() {
var rootStyle = {
  backgroundColor : '#141414',
  }

var ButtonStyle = {
  color : 'white'
  }

  return (
    <div align="left" style={rootStyle} >
      <Grid
          container
          direction="row"
        >
      <FileButton />
      <SettingButton />
      </Grid >
    </div>
  );
}