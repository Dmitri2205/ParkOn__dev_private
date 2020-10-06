import React,{useState} from 'react';
import ReactDOM from 'react-dom';


export default function Welcome(props){

	const [verificationMethod,setVerificationMethod] = useState(' ')
	return (
		<div className='verificationMethodScreen' >
		<div className="welcomeScreen">
		<p className="welcomeText">Добро пожаловать 
		<br/>
		в ParkOn
		</p>
			    <div className="loginLinksRow">

				  			 <button className="loginLink" onClick={()=>{props.authTypeSwitch("Log")}}>
				  			  Войти
				  			  </button>

				  			 <button className="loginLink" onClick={()=>{props.authTypeSwitch("Reg")}}>
							  Зарегистрироваться 
				  			  </button>

				</div>
			  </div>
			</div>
		);
	}