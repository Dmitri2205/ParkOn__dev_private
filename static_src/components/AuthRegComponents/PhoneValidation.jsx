import React,{ useState,useEffect } from "react";
import ReactDOM from "react-dom";
import validationFaild from "../img/validationFaild.png";
import validationSuccess from "../img/validationSuccess.png";
import AuthService from '../Services/AuthService';


export default function LoginPhone(props){
const [input,setInput] = useState(' ');
const [validate,setValidate] = useState(false);
const [passwordInput,setPasswordInput] = useState(' ');
const [authorized,setAuthorized] = useState(' ');
const [isPassOk,setPassOk] = useState(' ');
 



useEffect(()=>{
  input.length > 10 ? validateFunction() : false;
})
//---------------------Обработчик ввода-------------------------------------//

let inputHandler=()=>{
const string = event.target.value;
console.log(string);
//-------------Маска подстановки символов в поле телефона------------------//
const newString = string.replace( /(^8|7)(\d{3})(\d{3})(\d{2})(\d{2})/g, '+7(' + string[1]+string[2]+string[3] + ")" + string[4]+string[5]+string[6]+'-'+string[7]+string[8]+'-'+string[9]+string[10]  );
event.target.value = newString;
  setTimeout(()=>{
  handleValues();       //Вызов обработчика значений ввода
  },50);
setInput(event.target.value);
};




let handleValues = () => { //Обработчик введённого значения телефона
  if (input.length > 11) {
    validateFunction(); // Вызов функции валидации
  return(null); // Когда номер введён,перестаём изменять state при последующем вводе    
  };
};


let validateFunction=()=>{   //Функция валидации
  //-----------Регулярное выражение для валидации-----------------//
  const regular = /\+[7]{1}[\(]{1}\d{3}[\)]{1}\d{3}[-]{1}\d{2}[-]{1}\d{2}/g;
  const result = regular.exec(input); //Вернёт массив с результатом либо null 
  console.log(result);
    if(result !== null){
      setValidate(true)
    }else{
      setValidate(false);
  };
};

//------------------------Функция кнопки------------------------//

let validationButtonHandler = (e) => { 
    
  if (input.length > 15 && validate && isPassOk) {
    Promise.resolve( AuthService.makeLogin({ email:original, password: passwordInput.toString() }))
    .then( () => props.passedState(isPassOk));
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

let passwordHandler = (value) => {
setTimeout(()=>{
setPasswordInput(Number(value)); //Конвертируем строку ввода пароля в номер для сравнения с генерируемым кодом 
validatePassword(value);
},50);
};
//----------Проверка пароля------------------//

let validatePassword = (value) => {
  let isPassOk = false;

  if (value) {
    isPassOk = value.toString().trim().length > 3 ? true : false;
  }
  setPassOk(true);
}
	return (

    <div className="verificationMethodScreen" 
          style={props.auth === "Phone" ? {display:'block'}:{display:'none'}}>
		<div className="loginScreen">

      <div className="registration">
      <h3>Авторизация</h3>
      </div>
      
    <div className="regwrapper">

    
      <div className="validationInputRow">
     
      <p>Номер телефона</p>
          <div className="inputRowComponent">
          
            <input onChange={inputHandler} 
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
            <input className="validationInputField" 
                   placeholder="• • • • •" 
                   onChange={ ()=>{passwordHandler(event.target.value)}}
                   maxLength="5"/>
              <img className="validationInputFieldIndication"src={validationSuccess}
                   style={isPassOk ? {display:'block'}:{display:'none'} }
              />
              <img className="validationInputFieldIndication"src={validationFaild}
                   style={isPassOk ? {display:'block'}:{display:'none'} }
            />  
          </div>
      </div>
    </div>
         <button className="passwordSendButton" style={isPassOk  ? { opacity:1} : {opacity:0.5}
                                                           }
                onClick={ ()=>{validationButtonHandler(event)}}
        > 
             <p>Войти</p>
         </button>
         </div>
      </div>
    </div>
  );
}