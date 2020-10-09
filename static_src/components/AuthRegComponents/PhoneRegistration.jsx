import React,{useState,useEffect} from "react";
import ReactDOM from "react-dom";
import validationFaild from "../img/validationFaild.png";
import validationSuccess from "../img/validationSuccess.png";
import axios from 'axios';
import AuthService from '../Services/AuthService';


export default function Phonereg(props){
const [input,setInput] = useState(' ');
const [validate,setValidate] = useState(' ');
const [passwordInput,setPasswordInput] = useState(' ');
const [generatedCode,setGeneratedCode] = useState(' ');
const [codeSended,setCodeSended] = useState(false);
const [authorised,setAuthorised] = useState(' ');
const [original,setOriginal] = useState(' ');
const serverRegisterURL = 'http:\//localhost:8000/api/auth/register'; 
const apiUrl = '`https:\//sms.ru/sms/send?api_id=EDC6C1CA-CEE9-8205-1640-134DAFB6127E&to=${this.state.original}&msg=${this.state.generatedCode}&json=1`';
//---------------------Обработчик ввода-------------------------------------//
useEffect(()=>{
  handleValues();
})

var inputHandler=()=>{
  const string = event.target.value;
  console.log(string);
  const newString = string.replace( /(^8|7)(\d{3})(\d{3})(\d{2})(\d{2})/g, '+7(' + string[1]+string[2]+string[3] + ")" + string[4]+string[5]+string[6]+'-'+string[7]+string[8]+'-'+string[9]+string[10]  );
  console.log(newString);
  setOriginal(string);
  event.target.value = newString;
  setInput(event.target.value);
  setTimeout(()=>{
  handleValues();       //Вызов обработчика значений ввода
  },100);
};
var handleValues = () => { //Обработчик введённого значения телефона  
 if (input.length > 11) {
  validateFunction(); // Вызов функции валидации
  return(null); // Когда номер введён,перестаём изменять state при последующем вводе    
  };
};
var validateFunction=()=>{   //Функция валидации
  const regular = /\+[7]{1}[\(]{1}\d{3}[\)]{1}\d{3}[-]{1}\d{2}[-]{1}\d{2}/g;
  const result = regular.exec(input); //Вернёт массив с результатом либо null 
  console.log(result);
    result !== null ? setValidate(true) : setValidate(false);
};
//----------Функция генерации одноразового кода------------------//
var generateCommonCode=()=>{
  let code = Math.floor(Math.random()*100000) //Генерация от 4х до 5и знаков
  console.log(code);
    setGeneratedCode(code) 
        setTimeout(()=>{
        const url = `https://sms.ru/sms/send?api_id=EDC6C1CA-CEE9-8205-1640-134DAFB6127E&to=${this.state.original}&msg=Сохраните+этот+код+:+${this.state.generatedCode}&json=1`;
      console.log(url)
        fetch(url)
        .then(response => { 
          console.log(response);
      });
      },3000);
};
//------------------------Функция кнопки------------------------//
var validationButtonHandler = (e) => {
    if(codeSended != true && input.length > 15 && validate === true){
      const generated = generateCommonCode();
        setCodeSended(true);
      }else if(codeSended === true && generatedCode != ' ' && passwordInput === generatedCode && validate === true) {
        new Promise( (resolve) => {
        resolve( AuthService.makeRegister({ email: input, password: passwordInput.toString() }) )
      }).then( () => {
        AuthService.makeLogin({ email: input, password: passwordInput.toString() });
      }).then( () =>  props.passedState(this.state.isPassOk))
      .catch( err => console.error(err) );
      }else if(validate === true && codeSended === true && generatedCode !== passwordInput){
        alert("Вы ввели некорректный код");
      }else if(validate !== true && codeSended === true || codeSended !== true   && input.length < 15) {
        alert('Вы ввели неверный номер телефона');
   };
};
var passwordHandler = (value) => {
setTimeout(()=>{
setPasswordInput(Number(value)); //Конвертируем строку ввода пароля в номер для сравнения с генерируемым кодом 
},50);
};
  return (
    <div className="verificationMethodScreen"
        style={props.rm === "Phone" ? {display:'block'}:{display:'none'}}
    >
      <div className="loginScreen">

      <div className="registration">
      <h3>Регистрация</h3>
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
        <div className="codeField" 
             style={codeSended === true ? {display:'block'}:{display:'none'}}>
          <p>Введите код</p> 
            <div className="inputRowComponent"> 
          <input 
              className="validationInputField" 
              placeholder="• • • • •" 
              onChange={ ()=>{passwordHandler(event.target.value)}}
              maxLength="5"/>
   <img className="validationInputFieldIndication"src={validationSuccess}
                style={generatedCode === passwordInput ? {display:'block'}:{display:'none'} }
            />
          <img className="validationInputFieldIndication"src={validationFaild}
            style={generatedCode !== passwordInput ? {display:'block'}:{display:'none'} }
            />  
            <p className="validationErrorText" style={ codeSended === true && passwordInput !== generatedCode  ? {display:'block'} : {display:'none'} }>Мне не пришёл код.<a href="#">Отправить повторно</a></p>
          </div>
      </div>
    </div>
        <button className="passwordSendButton" style={validate === true || passwordInput === generatedCode  ? { opacity:1} : {opacity:0.5}}
                onClick={ ()=>{validationButtonHandler(event)}}
        > 
          <p style={codeSended == false ? {display:'block'} : {display:'none'}}>Получить код</p>
          <p style={codeSended == true ? {display:'block'} : {display:'none'}}>Зарегистрироваться</p>
         </button>
         </div>
       </div>  
    </div>
    );
  }