import React from "react";
import ReactDOM from "react-dom";
import validationFaild from "../img/validationFaild.png";
import validationSuccess from "../img/validationSuccess.png";
import axios from 'axios';
import AuthService from '../Services/AuthService';


export default class Phonereg extends React.Component {

  state={
    input:' ',
    validate:' ',
    passwordInput:' ',
    generatedCode:' ',
    codeSended:false,
    serverRegisterURL:'http:\//localhost:8000/api/auth/register',
    apiUrl:'`https:\//sms.ru/sms/send?api_id=EDC6C1CA-CEE9-8205-1640-134DAFB6127E&to=${this.state.original}&msg=${this.state.generatedCode}&json=1`',
    authorised:" ",
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

this.setState( { input:event.target.value});
  setTimeout(()=>{
  this.handleValues();       //Вызов обработчика значений ввода
  },100);
};




handleValues = () => { //Обработчик введённого значения телефона
  
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


//----------Функция генерации одноразового кода------------------//

generateCommonCode=()=>{
  let code = Math.floor(Math.random()*100000) //Генерация от 4х до 5и знаков
  console.log(code);
    this.setState({generatedCode:code}) 
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

validationButtonHandler = (e) => {
  const {codeSended,input,generatedCode,passwordInput,validate,original} = this.state;//Объявляем значения из state
    
    if(codeSended != true && input.length > 15 && validate === true){
      const generated = this.generateCommonCode();
        this.setState({codeSended:true});
            
   
    }else if(codeSended === true && generatedCode != ' ' && passwordInput === generatedCode && validate === true) {
    


      new Promise( (resolve) => {
        resolve( AuthService.makeRegister({ email: input, password: passwordInput.toString() }) )
      }).then( () => {
        AuthService.makeLogin({ email: input, password: passwordInput.toString() });
      }).then( () =>  this.props.passedState(this.state.isPassOk))
      .catch( err => console.error(err) );
    }else if(validate === true && codeSended === true && generatedCode !== passwordInput){
      alert("Вы ввели некорректный код");
    }else if(validate !== true && codeSended === true || codeSended !== true   && input.length < 15) {
      alert('Вы ввели неверный номер телефона');
    //----------SMS API---------------//


   };
};








//--------------Обработчик ввода поля пароля---------------//

passwordHandler = (value) => {
setTimeout(()=>{
this.setState({passwordInput:Number(value) }); //Конвертируем строку ввода пароля в номер для сравнения с генерируемым кодом 
},50);
}



render(){
const {codeSended,generatedCode,passwordInput,input,validate} = this.state;  
  return (

    <div className="verificationMethodScreen"
        style={this.props.rm === "Phone" ? {display:'block'}:{display:'none'}}
    >
      <div className="loginScreen">

      <div className="registration">
      <h3>Регистрация</h3>
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
        
        <div className="codeField" 
             style={this.state.codeSended === true ? {display:'block'}:{display:'none'}}>
         
          <p>Введите код</p> 
            <div className="inputRowComponent"> 
          <input 
              className="validationInputField" 
              placeholder="• • • • •" 
              onChange={ ()=>{this.passwordHandler(event.target.value)}}
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

         <button className="passwordSendButton" style={validate === true || passwordInput === generatedCode  ? { opacity:1} : {opacity:0.5}
                                                           }
                onClick={ ()=>{this.validationButtonHandler(event)}}
        > 
             <p style={codeSended == false ? {display:'block'} : {display:'none'}}>Получить код</p>
             <p style={codeSended == true ? {display:'block'} : {display:'none'}}>Зарегистрироваться</p>
         </button>
         </div>
       </div>  
</div>
    );
  }
}