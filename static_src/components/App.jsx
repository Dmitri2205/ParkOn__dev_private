import React from "react";
import ReactDOM from "react-dom";
import Karma from './modules/license.js';
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
	}
}

 
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
		// const license = Karma();
		// console.log(license);
		const { currentScreen } = this.state;
		const switchingFunction = () => {
				if (currentScreen === 'mainScreen' && localStorage.getItem('lastScreen') === ' ') {
				setTimeout( ()=>{
					this.setState({currentScreen:'welcome'});
					sessionStorage.setItem('lastScreen','welcome');
					},3500);
					const element = <MainScreen />; 
					return (element);

				}else if (currentScreen === 'welcome') {
					const element = <Welcome authTypeSwitch={this.authTypeSwitch}
					/>;	
					sessionStorage.setItem('lastScreen','welcome');

					return (element);
				}else if (currentScreen === 'training') {
					const element = <Training trainingSwitch={this.trainingSwitch}/>;
					sessionStorage.setItem('lastScreen','training');
					return (element);

				
					}else if (currentScreen === 'letstraining') {
					sessionStorage.setItem('lastScreen','letstraining');
					const element = <Letstraining trainingSwitch={this.trainingSwitch}
												  state={this.state.currentScreen}
					/>;
					return (element);	




				}else if (currentScreen === 'mapModule') {
					const element = <MapModule 	streamSwitch={this.streamSwitch}
												streamToCam={this.state.streamToCam}/>;

					return(element);

				}else if (currentScreen === 'stream') {
					const element = <Stream streamSwitch={this.streamSwitch}/>;

					return (element);
		
				}else if (currentScreen === 'changeAuto') {
					const element = <Changeauto passedVerification={this.passedVerification}
												currentScreen={currentScreen}
												backFunction={this.backFunction}

					/>;

					return (element);
		
				}else if (currentScreen === 'changeReg') {
					const element = <Changereg passedVerification={this.passedVerification}
												currentScreen={currentScreen}
												backFunction={this.backFunction}
					/>;

					return (element);
		
				}else{
					return null;
				};


		};
		const content = switchingFunction();
	

	return( 
			<div className='App'>
			{content}
			</div>
	);	
  }
}