import React from "react";
import ReactDOM from 'react-dom';
import {Link} from "react-router-dom";
import MapModule from './MapModule';




export default class Training extends React.Component {

    state={
        
    };

    


    render(){
        return <div className="training">
                      <h3>
                        Регистрация
                        <br/>
                        прошла успешно
                      </h3>
      
      <div className="loginLinksRow">

                    <button className="loginLink" onClick={ () => {this.props.trainingSwitch("Letstraining") }}>
                      Краткое обучение
                    </button>

                    <button className="loginLink" onClick={ () => {this.props.trainingSwitch("mapModule") }}>
                      Пропустить 
                    </button>
                      
              </div>
          </div>
      
        }
      }