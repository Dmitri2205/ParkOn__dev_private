import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import validationFaild from "../img/validationFaild.png";
import validationSuccess from "../img/validationSuccess.png";
import AuthService from '../Services/AuthService';

export default function Emailregistration(props){
const [input,setInput] = useState(' ');
const [passwordInput,setPasswordInput] = useState(' ');
const [validate,setValidate] = useState(false);
const [mailNotExist,setMailNotExist] = useState(' ');
const [mailUsed,setMailUsed] = useState(' ');
const [mailString,setMailString] = useState(' ');
const [generatedCode,setGeneratedCode] = useState(' ');
const [codeSended,setCodeSended] = useState(' ');
const [apiUrl,setApiUrl] = useState(' ');

useEffect(()=>{
 handleValues(input);
});
var inputHandler = (event) =>{
setTimeout(()=>{
setInput(event.target.value);
	validateFunction();
	handleValues(event);
	},100);
};
var handleValues = (input) => {
  if (input.length > 11) {
    setInput(input)
  }else{
  setTimeout( () => {
      setMailString(true);
  },100)
  }
};
var validateFunction=()=>{
  let regular = /\w+\@{1}\w+\.[a-z]{2,3}$/g;
  let result = regular.exec(input);
  console.log(result);
  if(result !== null){
  setValidate(true);
  }else{
  setValidate(false);
  }
};
var validationButtonHandler = () => {
  	if(codeSended != true && input.length > 5){
  		generateCommonCode();
  		setCodeSended(true);
  	}else if(codeSended && generatedCode != ' ' && passwordInput === generatedCode  && validate === true){
			new Promise( (resolve) => {
				resolve(AuthService.makeLogin({ email: input, password: passwordInput.toString() }) )
			})
			.then( () => {props.passedState(true)});
  	};
  };
var generateCommonCode=()=>{
		let code = Math.floor(Math.random()*100000)
		console.log(code);
			setGeneratedCode(code);
			new Promise( (resolve) => {
				resolve( AuthService.makeRegister({ email:input, password:code.toString() }) )
			}).then( () => {console.log('makeRegister')});
};
var passwordHandler = (value) => {
	setTimeout(()=>{
		setPasswordInput(Number(value));
	},50);
};
return (
<div className="verificationMethodScreen"
        style={props.rm === "Mail" ? {display:'block'}:{display:'none'}}
    >
	<div className="loginScreen">
		<div className="registration">
			<h3>Регистрация</h3>
		</div>
	<div className="regwrapper">
		<div className="validationInputRow">
			<p>Электронная почта</p>
			<div className="inputRowComponent">
			
					<input onChange={()=> {inputHandler(event)}} 
						className="validationInputField"
						placeholder="ivanov.ivan@mail.ru"
				/>
<p className="validationErrorText" style={validate === false ? {display:'block'}:{display:'none'}
                 }>Адрес введён неправильно.<a href="/Emailauto">Попробуйте ещё раз</a></p>

<p className="validationErrorText" style={ mailNotExist === true ? {display:'block'} : {display:'none'} }>Указанный адрес не зарегистрирован</p>
							<p className="validationErrorText" style={ mailUsed === true ? {display:'block'} : {display:'none'} }>Указанный адрес уже используется.Нажмите <a href="/About">Войти</a></p>
				
				<img className="validationInputFieldIndication"src={validationSuccess}
				style={input.length > 0 && validate != false && mailUsed !== true && mailNotExist !== true ? {display:'block'}:{display:'none'} }
				/>
				
				<img className="validationInputFieldIndication"src={validationFaild}
				style={mailUsed === true || mailNotExist === true || validate === false ? {display:'block'}:{display:'none'} }
				/>
					<p className="validationErrorText" style={ mailNotExist === true ? {display:'block'} : {display:'none'} }>Указанный адрес не существует</p>
					<p className="validationErrorText" style={ mailUsed === true ? {display:'block'} : {display:'none'} }>Указанный адрес уже используется.Нажмите <a href="/About">Войти</a></p>
			</div>
			<div className="codeField" 
				 style={codeSended === true ? {display:'block'}:{display:'none'}}>
				<p>Введите код</p>	
				   <div className="inputRowComponent"> 
					<input 
						className="validationInputField" placeholder="• • • • •"
						maxLength="5"
						onChange={ ()=>{passwordHandler(event.target.value)}}
					/>
<p className="validationErrorText" style={codeSended === true ? {display:'block'} : {display:'none'} }>Не получили код?Нажмите <a href="#">Выслать ещё раз</a></p>
				 <img className="validationInputFieldIndication"src={validationSuccess}
        			  style={generatedCode === passwordInput ? {display:'block'}:{display:'none'} }
     			  />
     			<img className="validationInputFieldIndication"src={validationFaild}
        		style={generatedCode !== passwordInput ? {display:'block'}:{display:'none'} }
      			/>	
				</div>
			</div>
		</div>
				<button className="passwordSendButton" 
						style={validate !== true || mailUsed === true || mailNotExist === true ? {opacity:0.5} : { opacity:1}}		
						onClick={ ()=>{validationButtonHandler(event)}}> 
					<p style={codeSended == false ? {display:'block'} : {display:'none'}}>Выслать код</p>
					<p style={codeSended == true ? {display:'block'} : {display:'none'}}>Войти</p>
				 </button>
				 </div>
			</div>
		</div>
	);
}
