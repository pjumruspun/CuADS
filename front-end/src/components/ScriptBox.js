import React, { Component }  from 'react';
import { Grid } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import AddIcon from '@material-ui/icons/AddRounded';
import RemoveIcon from '@material-ui/icons/RemoveRounded';
var rootStyle = {
  backgroundColor : '#141414',
  height: '52vh',
  width: '40vw',
  }
class ScriptBox extends Component {
render(){
return (
    <div align="left" style={rootStyle} >
     <Grid
  	container
  	direction="column"
  	justify="space-around"
	alignItems="flex-start"
	style={{padding: '12px'}}
	>
	<div>
	<div style={{marginBottom:'12px'}}>Script:</div>
	<InputBase 
        multiline
        rows={3}
        inputProps={{ 'aria-label': 'naked' }}
	style={{
 	backgroundColor : '#bababa',
  	width: '38vw',
	marginBottom:'12px'
  	}}
      	/>
	</div>
	<div style={{marginBottom:'12px'}}>Time:</div>
	<Grid
	container
  	direction="row"
  	alignItems="center"
  	justify="flex-start"
	>
	<div style={{marginRight:'10px',marginBottom:'12px'}} >From:</div>
	<InputBase 
        inputProps={{ 'aria-label': 'naked' }}
	style={{
  	backgroundColor : '#bababa',
  	height: '2vh',
	width: '7vw',
  	marginRight:'10px',
	marginBottom:'10px'
	}}
      	/>
	<div style={{marginRight:'10px',marginBottom:'12px'}}>To:</div>
	<InputBase 
        inputProps={{ 'aria-label': 'naked' }}
	style={{
  	backgroundColor : '#bababa',
	height: '2vh',
  	width: '7vw',
  	marginRight:'10px',
	marginBottom:'10px'
	}}
      	/>
	</Grid>
	<div style={{marginBottom:'8px',direction:"row"}}>Adjustment:</div>
	<Grid
	container
  	direction="row"
	alignItems="center"
  	justify="flex-start"
	>
 		<div style={{marginRight:'12px'}}>
			<div style={{marginRight:'10px',marginBottom:'12px'}} >Volumn:</div>
			<div style={{marginRight:'10px',marginBottom:'12px'}} >Speed:</div>
			<div style={{marginRight:'10px',marginBottom:'12px'}} >Pitch:</div>
		</div>
		<div>
			<Grid container direction="row" style={{marginBottom:'12px', alignItems: 'center'}} >
      				<RemoveIcon/>
      					<input type="text" placeholder="Volumn" value="100%" class="input-box" style={{backgroundColor : '#bababa',width: '3vw'}}/>
      				<AddIcon/>
			</Grid>
			<Grid container direction="row" style={{marginBottom:'12px', alignItems: 'center'}} >

      				<RemoveIcon/>
      					<input type="text" placeholder="Speed" value="x1" class="input-box" style={{backgroundColor : '#bababa',width: '3vw'}}/>
      				<AddIcon/>
			</Grid>
			<Grid container direction="row" style={{marginBottom:'12px', alignItems: 'center'}} >

      				<RemoveIcon />
      					<input type="text" placeholder="Pitch" value="1.0" class="input-box" style={{backgroundColor : '#bababa',width: '3vw'}}/>
      				<AddIcon/>
   			</Grid>
		</div>
	</Grid>
	<Button variant="contained" style={{ alignSelf: "flex-end" }}>Generate TTS</Button>
	</Grid>  
    </div>
  );
}
}
export default ScriptBox;