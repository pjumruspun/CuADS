import React, { Component,useState }  from 'react';
import { Grid } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import AddIcon from '@material-ui/icons/AddRounded';
import RemoveIcon from '@material-ui/icons/RemoveRounded';
import axios from 'axios';

var rootStyle = {
  backgroundColor : '#141414',
  height: '52vh',
  width: '40vw',
  }

class ScriptBox extends Component {
constructor(props) {
    super(props);
<<<<<<< HEAD
    this.state = {volumn: 100
		,speed: '1'
		,pitch: '1.0'
		,audio: ''};
=======
>>>>>>> 3c1971d9dac2cd78f66ffe8ebb065ae39539eef7
  }
rmVolume = () => {
  if(this.props.trackvolume!=0){
  
  const fieldName = 'trackvolume';
  const fieldValue = this.props.trackvolume-5;
  this.props.onChange(fieldName, fieldValue);
  }
}
addVolume = () => {
  if(this.props.trackvolume!=100){

  const fieldName = 'trackvolume';
  const fieldValue = this.props.trackvolume+5;
  this.props.onChange(fieldName, fieldValue);
  }
}
rmSpeed = () => {
  if(this.props.speed!=0.25){
  
  const fieldName = 'speed';
  const fieldValue = this.props.speed-0.25;
  this.props.onChange(fieldName, fieldValue);
  }
}
addSpeed = () => {
  if(this.props.speed!=2.00){
  const fieldName = 'speed';
  const fieldValue = this.props.speed+0.25;
  this.props.onChange(fieldName, fieldValue);
  }
}
<<<<<<< HEAD
handleText = (e) => {
	this.setState({text: e.target.value})
}
generateTTS = () => {
	
}
async downloadFile() {
	const response = axios.get("http://localhost:3001/tts/ฉันเดินเข้าไปในห้อง");
	// const bufferdecoded = Buffer.from((await response).data.audio, 'base64');
	const decoded = "data:audio/mpeg;base64," + (await response).data.audio;
	console.log("Playing");
	var snd = new Audio(decoded);
	snd.play();
	console.log('Success!')
}
=======

>>>>>>> 3c1971d9dac2cd78f66ffe8ebb065ae39539eef7
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
		onChange={this.handleText}
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
			<div style={{marginRight:'10px',marginBottom:'12px'}} >Volume:</div>
			<div style={{marginRight:'10px',marginBottom:'12px'}} >Speed:</div>
		</div>
		<div>
			<Grid container direction="row" style={{marginBottom:'3px', alignItems: 'center'}} >
				<Button onClick={this.rmVolume}>
      				<RemoveIcon style={{color : '#bababa'}}/>
				</Button>
      					<input type="text" placeholder="Volume" value={this.props.trackvolume+"%"} class="input-box" style={{backgroundColor : '#bababa',width: '3vw'}}/>
      				<Button onClick={this.addVolume}>
				<AddIcon style={{color : '#bababa'}}/>
				</Button>
			</Grid>
			<Grid container direction="row" style={{marginBottom:'3px', alignItems: 'center'}} >

      				<Button onClick={this.rmSpeed}>
      				<RemoveIcon style={{color : '#bababa'}}/>
				</Button>
      					<input type="text" placeholder="Speed" value={"x"+this.props.speed} class="input-box" style={{backgroundColor : '#bababa',width: '3vw'}}/>
      				<Button onClick={this.addSpeed}>
				<AddIcon style={{color : '#bababa'}}/>
				</Button>
			</Grid>
		</div>
	</Grid>
	<Button variant="contained" style={{ alignSelf: "flex-end" }} onClick={this.downloadFile}>Generate TTS</Button>
	</Grid>  
    </div>
  );
}
}
export default ScriptBox;