import React, { Component }  from 'react';
import FileButton from './FileButton.js';
import SettingButton from './SettingButton.js';
import { Grid } from "@material-ui/core";

var rootStyle = {
  backgroundColor : '#141414',
  }

class Bar extends Component {
render(){
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
}
export default Bar;