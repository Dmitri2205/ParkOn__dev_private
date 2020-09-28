import React from "react";
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import markGreen from "../img/markGreen.png";
import markRed from "../img/markRed.png";
import camera from "../img/photo.png";
import findme from "../img/someicon.png";
import plus from "../img/plus.png";
import stroke from "../img/stroke.png";


export default class Letstraining extends React.Component {
    constructor(props) {
        super(props);
        this.demo = React.createRef();
    };
    componentWillReceiveProps(props) {
        if (props.cMS === 'letsTraining') {
            this.demo.current.style.animation = "personal__screens .7s ease";
            this.demo.current.style.animationFillMode = "forwards";
        };
    }

    render() {
        return (
            <div  ref={this.demo} className="mainadvise" style={this.props.state === "letstraining" || this.props.cMS === "letsTraining" ? {display:'block'}:{display:'none'}}>
          <div className="AdviseTopRow">
            <div className="backToPersonal"
                        onClick={ ()=>{this.props.back("back")} }
                   >
                      <img src={stroke} />
                   </div>
          </div>
            <div className="adviceRow">   
              <div className="advice ">
                <p className="adviceText">
                  Камеры ParkOn. 
                  Зеленый цвет - свободно
                  Красный - мест нет 
                  Цифрами указано 
                  количество мест. Нажав на иконку вы можете посмотреть трансляцию с камеры 
                </p>
              <div className="red_green_icons">

              <div className="redicon">
                <img className="ico" src={camera} style={{zIndex:2}}/>
                <img src="static/build/markRed.png" style={{position:"absolute",top:0,left:0}}/>
              </div>
            <div className="greenicon">
              <img className="ico" src={camera} style={{zIndex:2}}/>
              <p className="num" style={{zIndex:2}}>9+</p>
              <img src="static/build/markGreen.png" style={{position:"absolute",top:0,left:0}}/>
            </div>
          </div>
    </div>


<div className="advice">
  <div className="gradient_home">
    <div className="home_main">
      <div className="home">
        <img src="static/build/home.png" style={{display:'inline-block',width:'38px',height:'38px'}}/>
      </div>
    </div>
  </div>

  <p className="adviceText">Кнопка “Домой” -быстрый доступ к информации по парковочным местам рядом с домом. Сохранить или изменить адрес дома можно в личном кабинете</p>        
</div>

<div className="advice">
  <p className="adviceText">
  Быстрый доступ к поиску
   адреса места парковки
    с 
    помощью голоса   
    </p>

        <div className="gradient_photo">
          <div className="micro_main">
            <div className="micro">
              <img src="static/build/Group.png" style={{display:'inline-block'}}/>
            </div>
          </div>
        </div>
      </div>
  </div>      





            <
            >
            <button onClick={()=>{this.props.trainingSwitch("mapModule")}} 
                      className="loginLink__training"
                      style={this.props.cMS === "letsTraining" ? {display:"none"}:{display:"block"}}
              >
                 Завершить
                 </button> <
            />
</div>
        )
    }
}