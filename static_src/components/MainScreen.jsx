import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import axios from "axios";

export default class MainScreen extends React.Component{


state={

};






dataFetch = () => {
let path = "";
		if (!AuthService.isAccesTokenExpired()) {
			path ='/MapModule';
		}
		this.loaddingRedirect(path);	
}



render(){
	//Data
	return (
		
			<div className='mainScreen' >
				<div className="logo">
						<p>Park</p>
				<div className="switch">
						<p className="circleText">ON</p>
						<span className="switchCircle"></span>
				</div>
				</div>
				<p style={{color:"transparent",position:'absolute',bottom:0,right:"18%"}}>Copyright © Dmitry Baranov 2020</p>
			</div>
	);
  }
}