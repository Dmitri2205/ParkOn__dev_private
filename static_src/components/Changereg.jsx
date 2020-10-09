import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {Link} from "react-router-dom";
import EmailRegistration from './AuthRegComponents/EmailRegistration';
import PhoneRegistration from './AuthRegComponents/PhoneRegistration';


export default function Changereg(props){

const [regMethod,setRegMethod] = useState(' ');
const [passed,setPassed] = useState(false);

useEffect(()=>{
console.log(passed);
		if (passed) {
	setTimeout(()=>{
		props.passedVerification(passed);
	},500)
	};
});
var handleReg = (string) => {
	let r = string; 
		if (r === "Phone") {
			setRegMethod(r);
		}else{
			setRegMethod(r);
		};
};
var passedState = (value) =>{
	if (value) {
		setPassed(true);
	}
}
	return(
		<div className="verificationMethodScreen">
		
		<div className="welcomeScreen__reg"
		     style={props.currentScreen === "changeReg" && regMethod === " " ? {display:'block'}:{display:'none'}}
		  > 
		<div className="BackToWelcome"><span onClick={props.backFunction}></span></div>
		<p>Выберите удобный 
		<br/>
		способ регистрации
		</p>
			    <div className="loginLinksRow">
				 
 						<button className="loginLink" onClick={()=>{handleReg("Phone")}}>
				  			  Номер телефона
				  		</button>
				
						
				 	    <button className="loginLink" onClick={()=>{handleReg("Mail")}}>
							  Электронная почта 
				  		</button>
				
				</div>
			  </div>
			  <PhoneRegistration rm={regMethod}/>
			  <EmailRegistration passedState={passedState}
			  					rm={regMethod}/>
			</div>
		)
	}