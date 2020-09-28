import React from "react";
import ReactDOM from 'react-dom';
import logo from '../img/logo.png';
import back_personal from '../img/back_personal.png';

export default class About extends React.Component{
constructor(props) {
  super(props);

  this.about = React.createRef();
}

componentWillReceiveProps(props){
    if (props.cMS === 'about') {
      this.about.current.style.animation = "personal__screens .7s ease";
      this.about.current.style.animationFillMode = "forwards";
    };
}

render(){
  return(
      <div ref={this.about}  className="About" style={this.props.cMS === "about" ? {display:'block'}:{display:'none'}}>
      
        <div className="aboutHeader">
            
             <div className="backToPersonal"
                  onClick={ ()=>{this.props.back("back")} }
             >
                <img src={back_personal} />
             </div>

          <div className="aboutLogo">
            <img src={logo}  />
          </div>
        
        </div>
      
        <div className="aboutTextWraper">
          <p className="aboutText">
            Команда ParkON благодарит вас
            за скачивание нашего приложения.
            Количество камер и возможности 
            будут развиваться пропорционально
            с желанием аудитории пользоваться
            нашим сервисом.
          <br/>
          <br/>
           Проект реализован благодаря
           Команде ParkON  , ее вере 
         <br/>и целеустремленности.
         <br/> Спасибо им:Дима,Абзал,Кирилл,Юра,Магдалина,
           Саша,Евгения,Евгений.
         <br/>
         <br/>
           Будьте с нами)
         </p>
        </div>
      </div>
    ); 
  }
}