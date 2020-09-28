import React from 'react';
import ReactDOM from 'react-dom';
import PhoneValidation from './AuthRegComponents/PhoneValidation';
import EmailValidation from './AuthRegComponents/EmailValidation';



export default class Changeauto extends React.Component {

state={
	authType:' ', //От этого параметра зависит отрисовка экрана авт.\рег.
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


handleAuth = (string) => {
	const r = string; 
		if (r === "Phone") {
			this.setState({ authType:r});
		}else{
			 this.setState({authType:r});
		}
};


passedState=(value)=>{
	if (value) {
this.setState({passed:true})
	};
};



handleAuth = (value)=> {
	if (value === "Phone") {
		this.setState({authType:value})
	}else{
		this.setState({authType:value})
	};
}

render(){
	const {currentScreen} = this.props;
	return (


		<div className="verificationMethodScreen"> 
		

		<div className="welcomeScreen__auth" 
			 style={currentScreen === "changeAuto" && this.state.authType === " "  ? {display:'block'} : {display:'none'} }>
		<div className="BackToWelcome"><span onClick={this.props.backFunction}></span></div>
		<p>
			Выберите удобный 
				<br/>
			способ авторизации
		</p>
			    <div className="loginLinksRow">
				 	    

				 	    <button className="loginLink" onClick={()=>{this.handleAuth("Phone")}}>
				  			  Номер телефона
				  		</button>
				
						
				 	    <button className="loginLink" onClick={()=>{this.handleAuth("Mail")}}>
							  Электронная почта 
				  		</button>
						
				</div>
			  </div>
			  <EmailValidation auth={this.state.authType}
							  passedState={this.passedState}/>

			  <PhoneValidation auth={this.state.authType}
			 				   passedState={this.passedState}
			  />
			 </div>
	);
  }
}