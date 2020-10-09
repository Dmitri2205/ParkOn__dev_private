import React,{ useState,useEffect } from "react";
import ReactDOM from "react-dom";
import validationFaild from "../img/validationFaild.png";
import validationSuccess from "../img/validationSuccess.png";
import AuthService from '../Services/AuthService';

export default function LoginEmail(props){
const [input,setInput] = useState(' ');
const [passwordInput,setPasswordInput] = useState(' ');
const [validate,setValidate] = useState(false);
const [mailNotExist,setMailNotExist] = useState(' ');
const [mailUsed,setMailUsed] = useState(' ');
const [mailString,setMailString] = useState(' ');
const [codeSended,setCodeSended] = useState(' ');
const [apiUrl,setApiUrl] = useState(' ');
const [isPassOk,setPassOk] = useState(' ');

useEffect(()=>{
  handleValues(event);
  validatePassword(passwordInput);
});
var inputHandler = (event) =>{
    setInput(event.target.value);
	validateFunction();
};
var handleValues = () => {
  if (input.length > 11) {
    setInput(input)
  }else{
    setMailString(true);
  }
};
var validateFunction=()=>{
  const regular = /\w+\@{1}\w+\.[a-z]{2,3}$/g;
  const result = regular.exec(input);
  if(result !== null){
  	setValidate(true)
  }else{
	setValidate(false)
  }
};
var passwordHandler = (value) => {
	setTimeout(()=>{
		setPasswordInput(Number(value));

	},50);
};
var validatePassword = (value) => {
  let isPassOk = false;
  if (value) {
  	let pass = value.toString();
    isPassOk = pass.length == 5 ? true : false;
  }
  setPassOk(isPassOk)
};//отрабатывает 2 раза
var validationButtonHandler = () => {
  	if (input.length >= 5 && validate && isPassOk) {
			Promise.resolve( AuthService.makeLogin({ email: input, password: passwordInput.toString() }))
			.then((response) => props.passedState(isPassOk)); 
		} else if (!isPassOk) {
			alert("Вы ввели некорректный код");
		}	else {
  		alert("Проверьте поля ввода и повторите попытку.");
  	}
};
	return (
<div className="verificationMethodScreen"
	 style={props.auth === "Mail" ? {display:'block'}:{display:'none'}}>
<div className="loginScreen">
	
	 <div className="registration">
      <h3>Авторизация</h3>
      </div>
      
    <div className="regwrapper">

		<div className="validationInputRow">
			
			<p>Введите адрес эл.почты</p>
			<div className="inputRowComponent">
			
				<input onChange={()=> {inputHandler(event)}} 
						className="validationInputField"
						placeholder="ivanov.ivan@mail.ru"

				/>
				
				<img className="validationInputFieldIndication"src={validationSuccess}
				style={input.length > 0 && validate != false && mailUsed !== true && mailNotExist !== true ? {display:'block'}:{display:'none'} }
				/>
				
				<img className="validationInputFieldIndication"src={validationFaild}
				style={mailUsed === true || mailNotExist === true || validate === false ? {display:'block'}:{display:'none'} }
				/>

							<p className="validationErrorText" style={ mailNotExist === true ? {display:'block'} : {display:'none'} }>Указанный адрес не существует</p>
							<p className="validationErrorText" style={ mailUsed === true ? {display:'block'} : {display:'none'} }>Указанный адрес уже используется.Нажмите <a href="/About">Войти</a></p>
							<p className="validationErrorText" style={ codeSended === true ? {display:'block'} : {display:'none'} }>Не получили код?Нажмите <a href="#">Выслать ещё раз</a></p>
			
			</div>
			
			<div className="codeField">
				
				<p>Введите код</p>	
				
				   <div className="inputRowComponent"> 
					<input 
						className="validationInputField" placeholder="• • • • •"
						maxLength="5"
						onChange={ ()=>{passwordHandler(event.target.value)}}
					/>
					 <img className="validationInputFieldIndication"src={validationSuccess}
			              style={isPassOk && passwordInput ? {display:'block'}:{display:'none'} }
		            />
		            <img className="validationInputFieldIndication"src={validationFaild}
			             style={(passwordInput.toString()).length < 5 && !isPassOk ? {display:'block'}:{display:'none'} }
		            />  	
						
							
		
					</div>
			</div>
		</div>

				<button className="passwordSendButton" 
						style={validate !== true || mailUsed === true || mailNotExist === true ? {opacity:0.5} : { opacity:1}}		
						onClick={ ()=>{validationButtonHandler(event)}}> 

					<p>Войти</p>
				 
				 </button>
		 </div>
	  </div>
	</div>
	);
  }