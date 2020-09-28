import React from "react";
import ReactDOM from "react-dom";
import validationFaild from "../img/validationFaild.png";
import validationSuccess from "../img/validationSuccess.png";
import AuthService from '../Services/AuthService';

export default class LoginEmail extends React.Component {

	state={
		input:' ',
		validate:false,
		mailNotExist:' ',
		mailUsed:' ',
		codeSended:' ',
		apiUrl:' ',
		passwordInput:' ',
		isPassOk:false,
	};





inputHandler = (event) =>{
setTimeout(()=>{
this.setState({input: event.target.value});
	this.validateFunction();
	this.handleValues(event);
	},100);
};

handleValues = () => {
  this.forceUpdate();
  if (this.state.input.length > 11) {
    this.setState({input:this.state.input})
  }else{

  setTimeout( () => {
      this.setState({mailString:true});
  },100)
  }
};

validateFunction=()=>{
  const regular = /\w+\@{1}\w+\.[a-z]{2,3}$/g;
  const result = regular.exec(this.state.input);
  console.log(result);
  if(result !== null){
  this.setState({validate:true})
  }else{
  this.setState({validate:false})
  }
};


validatePassword = (value) => {
  let isPassOk = false;

  if (value) {
    isPassOk = value.toString().trim().length > 3 ? true : false;
  }

  this.setState({isPassOk})
}

 
  validationButtonHandler = () => {
		const {input, passwordInput, validate, isPassOk} = this.state;
		
  	if (input.length > 5 && validate && isPassOk) {
			Promise.resolve( AuthService.makeLogin({ email: input, password: passwordInput.toString() }))
			.then((response) => this.props.passedState(this.state.isPassOk)) 
		} else if (!isPassOk) {
			alert("Вы ввели некорректный код");
		}	else {
  		alert("Проверьте поля ввода и повторите попытку.");
  	}
  };




passwordHandler = (value) => {
setTimeout(()=>{
this.setState({passwordInput:Number(value) });
this.validatePassword(value);
},200);
};



render(){
	const {mailUsed,codeSended,mailNotExist,passwordInput,input,validate,isPassOk} = this.state;
	return (
<div className="verificationMethodScreen"
	 style={this.props.auth === "Mail" ? {display:'block'}:{display:'none'}}>
<div className="loginScreen">
	
	 <div className="registration">
      <h3>Авторизация</h3>
      </div>
      
    <div className="regwrapper">

		<div className="validationInputRow">
			
			<p>Введите адрес эл.почты</p>
			<div className="inputRowComponent">
			
				<input onChange={()=> {this.inputHandler(event)}} 
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
						onChange={ ()=>{this.passwordHandler(event.target.value)}}
					/>
			
						
							
		
					</div>
			</div>
		</div>

				<button className="passwordSendButton" 
						style={validate !== true || mailUsed === true || mailNotExist === true ? {opacity:0.5} : { opacity:1}}		
						onClick={ ()=>{this.validationButtonHandler(event)}}> 

					<p>Войти</p>
				 
				 </button>
		 </div>
	  </div>
	</div>
	);
  }
}