import React from "react";
import ReactDOM from "react-dom";
import MainScreen from './MainScreen';
import style from "./styles/style.css";
import MapModule from "./MapModule";
import Welcome from './Welcome';
import Training from "./Training";
import Changeauto from "./Changeauto";
import Changereg from "./Changereg";
import Stream from "./Stream";
import Letstraining from "./PersonalRoomComponents/Letstraining";

export default class App extends React.Component{
	state ={
		currentScreen:'mainScreen',
		streamToCam:false,
		passed:' ',
	};
	componentDidMount(){
		if (sessionStorage.getItem('lastScreen')) {
			let screen = sessionStorage.getItem('lastScreen');
			this.setState({currentScreen:screen});
		};
	};
	switchingFunction = () => {
		const {currentScreen} = this.state;
		switch (currentScreen) {
			case 'mainScreen':
			setTimeout(()=>{
				this.setState({currentScreen:'mapModule'});
				sessionStorage.setItem('lastScreen', 'mapModule');
			},3500);
				return  <MainScreen />	
				break;
			case 'welcome':
				return <Welcome authTypeSwitch={this.authTypeSwitch}/>;
				sessionStorage.setItem('lastScreen', 'welcome');
				break;
			case 'training':
				return <Training trainingSwitch={this.trainingSwitch}/>;
				sessionStorage.setItem('lastScreen','training');
				break;
			case 'letstraining':
				return  <Letstraining trainingSwitch={this.trainingSwitch} state={this.state.currentScreen}/>;
				sessionStorage.setItem('lastScreen', 'letstraining');
				break;
			case 'mapModule':
				return <MapModule 	streamSwitch={this.streamSwitch} streamToCam={this.state.streamToCam}/>;
				sessionStorage.setItem('lastScreen', 'mapModule');
				break;
			case 'stream':
				return  <Stream streamSwitch={this.streamSwitch}/>;
				sessionStorage.setItem('lastScreen', 'stream');
				break;
			case 'changeAuto':
				return <Changeauto passedVerification={this.passedVerification} currentScreen={currentScreen} backFunction={this.backFunction}/>;
				sessionStorage.setItem('lastScreen', 'changeAuto');
				break;
			case 'changeReg':
				return  <Changereg passedVerification={this.passedVerification} currentScreen={currentScreen} backFunction={this.backFunction}/>;
				sessionStorage.setItem('lastScreen', 'changeReg');
				break;
			default:
				return null;
				break;
		}
	};
	streamSwitch = (value)=>{
		if (this.state.currentScreen != 'stream') {
			this.setState({currentScreen:"stream",streamToCam:false});
		}else{
			this.setState({currentScreen:"mapModule",streamToCam:true});
		};
	};
	authTypeSwitch = (value)=>{
		if(value === "Log"){
			console.log("App screen:" + value)
			this.setState({currentScreen:"changeAuto"});
		}else{
			console.log("App screen:" + value)
			this.setState({currentScreen:"changeReg"});
		};
	};
	passedVerification=(value)=>{
		if (value) {
			this.setState({currentScreen:"mapModule"})
		}
	};
	backFunction = ()=>{
		const {currentScreen} = this.state;
		if (currentScreen === "changeAuto") {
			this.setState({currentScreen:'welcome'});
		}else if (currentScreen === "changeReg") {
			this.setState({currentScreen:'welcome'});
		};
	};
	trainingSwitch = (value) => {
		if(value === 'Letstraining'){
			this.setState({currentScreen:'letstraining'});
		}else{
			this.setState({currentScreen:'mapModule'});
		};
	};
	render(){
		const content = this.switchingFunction();
		return( 
			<div className='App'>
			{content}
			</div>
	);	
  }
}