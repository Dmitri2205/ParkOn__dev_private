import React,{ useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import PhoneValidation from './AuthRegComponents/PhoneValidation';
import EmailValidation from './AuthRegComponents/EmailValidation';



export default function Changeauto (props){

const [authType,setAuthType] = useState(' ');
const [passed,setPassed] = useState(false);

useEffect(()=>{
	console.log(passed);
		if (passed) {
			setTimeout(()=>{
				props.passedVerification(passed);
			},500);
		}
});
var passedState=(value)=>{
	if (value) {
		setPassed(value);
	};
};
var handleAuth = (value)=> {
	if (value === "Phone") {
		setAuthType(value)
	}else{
		setAuthType(value)
	};
};
	return (
		<div className="verificationMethodScreen"> 
		

			<div className="welcomeScreen__auth" 
				 style={props.currentScreen === "changeAuto" && authType === " "  ? {display:'block'} : {display:'none'} }>
			<div className="BackToWelcome"><span onClick={props.backFunction}></span></div>
				<p>
					Выберите удобный 
						<br/>
					способ авторизации
				</p>
				    <div className="loginLinksRow">
					 	    <button className="loginLink" onClick={()=>{handleAuth("Phone")}}>
					  			  Номер телефона
					  		</button>
					 	    <button className="loginLink" onClick={()=>{handleAuth("Mail")}}>
								  Электронная почта 
					  		</button>
					</div>
			</div>
			<EmailValidation auth={authType}
							  passedState={passed}/>
			<PhoneValidation auth={authType}
							   passedState={passed}
			/>
		</div>
	);
  }