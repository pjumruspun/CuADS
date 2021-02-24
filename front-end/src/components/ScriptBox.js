import React, { Component,useState }  from 'react';
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
constructor(props) {
    super(props);
    this.state = {volume: this.props.trackvolume
		,speed: this.props.speed
		,pitch: 1};
  }
rmVolume = () => {
  if(this.state.volume!=0){
  this.setState({volume:this.state.volume-5});
  const fieldName = 'trackvolume';
  const fieldValue = this.state.volume-5;
  this.props.onChange(fieldName, fieldValue);
  }
}
addVolume = () => {
  if(this.state.volume!=100){
  this.setState({volume:this.state.volume+5});
  const fieldName = 'trackvolume';
  const fieldValue = this.state.volume+5;
  this.props.onChange(fieldName, fieldValue);
  }
}
rmSpeed = () => {
  if(this.state.speed!=0.25){
  this.setState({speed:this.state.speed-0.25});
  const fieldName = 'speed';
  const fieldValue = this.state.speed-0.25;
  this.props.onChange(fieldName, fieldValue);
  }
}
addSpeed = () => {
  if(this.state.speed!=2.00){
  this.setState({speed:this.state.speed+0.25});
  const fieldName = 'speed';
  const fieldValue = this.state.speed+0.25;
  this.props.onChange(fieldName, fieldValue);
  }
}
rmPitch = () => {
  if(this.state.pitch!=-10){
  this.setState({pitch:this.state.pitch-0.25});
  }
}
addPitch = () => {
  if(this.state.pitch!=10){
  this.setState({pitch:this.state.pitch+0.25});
  }
}
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
			<div style={{marginRight:'10px',marginBottom:'12px'}} >Volume:</div>
			<div style={{marginRight:'10px',marginBottom:'12px'}} >Speed:</div>
			<div style={{marginRight:'10px',marginBottom:'12px'}} >Pitch:</div>
		</div>
		<div>
			<Grid container direction="row" style={{marginBottom:'3px', alignItems: 'center'}} >
				<Button onClick={this.rmVolume}>
      				<RemoveIcon style={{color : '#bababa'}}/>
				</Button>
      					<input type="text" placeholder="Volume" value={this.state.volume+"%"} class="input-box" style={{backgroundColor : '#bababa',width: '3vw'}}/>
      				<Button onClick={this.addVolume}>
				<AddIcon style={{color : '#bababa'}}/>
				</Button>
			</Grid>
			<Grid container direction="row" style={{marginBottom:'3px', alignItems: 'center'}} >

      				<Button onClick={this.rmSpeed}>
      				<RemoveIcon style={{color : '#bababa'}}/>
				</Button>
      					<input type="text" placeholder="Speed" value={"x"+this.state.speed} class="input-box" style={{backgroundColor : '#bababa',width: '3vw'}}/>
      				<Button onClick={this.addSpeed}>
				<AddIcon style={{color : '#bababa'}}/>
				</Button>
			</Grid>
			<Grid container direction="row" style={{marginBottom:'3px', alignItems: 'center'}} >

      				<Button onClick={this.rmPitch}>
      				<RemoveIcon style={{color : '#bababa'}}/>
				</Button>
      					<input type="text" placeholder="Pitch" value={this.state.pitch} class="input-box" style={{backgroundColor : '#bababa',width: '3vw'}}/>
      				<Button onClick={this.addPitch}>
				<AddIcon style={{color : '#bababa'}}/>
				</Button>
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