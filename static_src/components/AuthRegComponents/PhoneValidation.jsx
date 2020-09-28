import React from "react";
import ReactDOM from "react-dom";
import validationFaild from "../img/validationFaild.png";
import validationSuccess from "../img/validationSuccess.png";
import AuthService from '../Services/AuthService';


export default class LoginPhone extends React.Component {

	state={
    input:' ',
    validate:false,
    passwordInput:' ',
    authorised:" ",
    isPassOk:' ',
  };

 

//---------------------Обработчик ввода-------------------------------------//

inputHandler=()=>{
const string = event.target.value;
console.log(string);
this.setState({original:Number(event.target.value)})

//-------------Маска подстановки символов в поле телефона------------------//


const newString = string.replace( /(^8|7)(\d{3})(\d{3})(\d{2})(\d{2})/g, '+7(' + string[1]+string[2]+string[3] + ")" + string[4]+string[5]+string[6]+'-'+string[7]+string[8]+'-'+string[9]+string[10]  );
console.log(newString);

//--Отрабатывает по группам захвата.Пробелы между ними сломают регулярку--//

event.target.value = newString;

this.setState( { input:event.target.value });
  setTimeout(()=>{
  this.handleValues();       //Вызов обработчика значений ввода
  },50);
};




handleValues = () => { //Обработчик введён ного значения телефона
  
  const { input } = this.state;
    this.forceUpdate();
 if (input.length > 11) {
  this.validateFunction(); // Вызов функции валидации
  return(null); // Когда номер введён,перестаём изменять state при последующем вводе    
  };
};


validateFunction=()=>{   //Функция валидации
  
  //-----------Регулярное выражение для валидации-----------------//

  const regular = /\+[7]{1}[\(]{1}\d{3}[\)]{1}\d{3}[-]{1}\d{2}[-]{1}\d{2}/g;
  const result = regular.exec(this.state.input); //Вернёт массив с результатом либо null 
  console.log(result);
    if(result !== null){
      this.setState({validate:true})
    }else{
      this.setState({validate:false})

  }
};


//----------Проверка пароля------------------//

validatePassword = (value) => {
  let isPassOk = false;

  if (value) {
    isPassOk = value.toString().trim().length > 3 ? true : false;
  }
  this.setState({isPassOk});
}

//------------------------Функция кнопки------------------------//

validationButtonHandler = (e) => { 
  const {input, passwordInput, validate, isPassOk,original} = this.state;//Объявляем значения из state
    
  if (input.length > 15 && validate && isPassOk) {
    Promise.resolve( AuthService.makeLogin({ email:original, password: passwordInput.toString() }))
    .then( () => this.props.passedState(this.state.isPassOk));
  } else if (!isPassOk) {
    alert("Вы ввели некорректный код");
  } else if (validate !== true || input.length < 15) {
    alert('Вы ввели неверный номер телефона');
  };
};


    //----------SMS API---------------//


   /*if (input.length === 16) {
fetch(`http:\//localhost:3000/?phone=${input}&password=${passwordInput}`,{mode:'no-cors'})
  .then(response => { 
    console.log(response);
    return response.text();
  })
  .then((result) => {
    console.log(result)
  })
}*/ 


//--------------Обработчик ввода поля пароля---------------//

passwordHandler = (value) => {
setTimeout(()=>{
this.setState({passwordInput:Number(value) }); //Конвертируем строку ввода пароля в номер для сравнения с генерируемым кодом 
this.validatePassword(value);
},50);
}


render(){
const {codeSended,passwordInput,input,validate,isPassOk} = this.state;
	return (

    <div className="verificationMethodScreen" 
          style={this.props.auth === "Phone" ? {display:'block'}:{display:'none'}}>
		<div className="loginScreen">

      <div className="registration">
      <h3>Авторизация</h3>
      </div>
      
    <div className="regwrapper">

    
      <div className="validationInputRow">
     
      <p>Номер телефона</p>
          <div className="inputRowComponent">
          
            <input onChange={this.inputHandler} 
                   className="validationInputField"
                   placeholder="+7(___)___-__-__"
                   maxLength="16"
                   
            />

<p className="validationErrorText" style={validate === false ? {display:'block'}:{display:'none'}
                 }>Номер введён неправильно.<a href="/PhoneValidation">Попробуйте ещё раз</a></p>
             
              <img className="validationInputFieldIndication"src={validationSuccess}
                   style={validate === true ? {display:'block'}:{display:'none'} }
              />
              <img className="validationInputFieldIndication"src={validationFaild}
              style={input.length > 3 && validate !== true ? {display:'block'}:{display:'none'} }
                />


          
        </div>
        
        <div className="codeField">
         
          <p>Введите код</p> 
            <div className="inputRowComponent"> 
          <input 
              className="validationInputField" 
              placeholder="• • • • •" 
              onChange={ ()=>{this.passwordHandler(event.target.value)}}
              maxLength="5"/>
   <img className="validationInputFieldIndication"src={validationSuccess}
                style={isPassOk ? {display:'block'}:{display:'none'} }
            />
     
          <img className="validationInputFieldIndication"src={validationFaild}
            style={isPassOk ? {display:'block'}:{display:'none'} }
            />  
            
            <p className="validationErrorText" style={ codeSended === true && passwordInput !== generatedCode  ? {display:'block'} : {display:'none'} }>Мне не пришёл код.<a href="#">Отправить повторно</a></p>        
    
          </div>
      </div>
    </div>

         <button className="passwordSendButton" style={isPassOk  ? { opacity:1} : {opacity:0.5}
                                                           }
                onClick={ ()=>{this.validationButtonHandler(event)}}
        > 
             <p>Войти</p>
         </button>
         </div>
      </div>
</div>
		);
  }
}