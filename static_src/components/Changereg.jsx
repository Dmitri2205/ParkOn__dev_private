import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from "react-router-dom";
import EmailRegistration from './AuthRegComponents/EmailRegistration';
import PhoneRegistration from './AuthRegComponents/PhoneRegistration';


export default class Changereg extends React.Component {

state={
	regMethod:' ',
	passed:false,
};

componentDidUpdate(){
	console.log(this.state.passed);
		if (this.state.passed) {
	setTimeout(()=>{
		this.props.passedVerification(this.state.passed);
	},500)
};
}


handleReg = (string) => {
	const r = string; 
		if (r === "Phone") {
			this.setState({ regMethod:r});
		}else{
			 this.setState({regMethod:r});
		}
};

passedState = (value) =>{
	if (value) {
		this.setState({passed:true});
	}
}



render(){
	const {currentScreen} = this.props;
	return(
		<div className="verificationMethodScreen">
		
		<div className="welcomeScreen__reg"
		     style={currentScreen === "changeReg" && this.state.regMethod === " " ? {display:'block'}:{display:'none'}}
		  > 
		<div className="BackToWelcome"><span onClick={this.props.backFunction}></span></div>
		<p>Выберите удобный 
		<br/>
		способ регистрации
		</p>
			    <div className="loginLinksRow">
				 
 						<button className="loginLink" onClick={()=>{this.handleReg("Phone")}}>
				  			  Номер телефона
				  		</button>
				
						
				 	    <button className="loginLink" onClick={()=>{this.handleReg("Mail")}}>
							  Электронная почта 
				  		</button>
				
				</div>
			  </div>
			  <PhoneRegistration rm={this.state.regMethod}/>
			  <EmailRegistration passedState={this.passedState}
			  					rm={this.state.regMethod}/>
			</div>
		)
	}
}