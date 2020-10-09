import React,{useState,useEffect } from "react";
import ReactDOM from 'react-dom';
import about_icon from "../img/about_icon.png";
import learn_icon from "../img/learn_icon.png";
import ruble from '../img/ruble.png';
import sup_icon from "../img/sup_icon.png";
import logo from '../img/logo.png'
import private_personal from '../img/private_personal.png'
import Personalroom from "./Personalroom";
import About from "./About";
import Letstraining from "./Letstraining";
import Feedback from "./Feedback";
import Croudfinding from "./Croudfinding";



export default function Personal(props){

const [currentMenuScreen,setCurrentMenuScreen] = useState(' ');

var personalSwitch=(s)=>{
    switch (s) {
        case "personalRoom":
            setCurrentMenuScreen(s);
            break;
        case "about":
            setCurrentMenuScreen(s);
            break;
        case "letsTraining":
            setCurrentMenuScreen(s);
            break;
        case "feedback":
            setCurrentMenuScreen(s);
            break;
        case "croudfinding":
            setCurrentMenuScreen(s);
            break;
        case "back":
            setCurrentMenuScreen(s);
            break;
    }
};
return (
            <div className="verificationMethodScreen">
        <div className="personal" style={currentMenuScreen && props.visibility ? {right:'0'} : {display:'none',right:'-100%'}}>
            <div className="personal_top">
                <div className="personal_header">
                
                      <p>Меню</p>
                  <span className="close" onClick={ ()=>{props.personalShow()} } />   
                </div>  
            </div>
            

            

            <div className="linkpersonal">
          <div className="linkList">
                    
                    <span onClick={()=>{personalSwitch("personalRoom")} } className="personal_link">
                    <img className="personal_icons" src={private_personal} alt="personal"/>
                            <p>Личный кабинет</p>                    
                    </span>

                    <span onClick={()=>{personalSwitch("about")} } className="personal_link">
                    <img className="personal_icons" src={about_icon} alt="about"/>
                            <p>О приложении</p>   
                                
                    </span>

                    <span onClick={()=>{personalSwitch("letsTraining")} } className="personal_link">    
                    <img className="personal_icons" src={learn_icon} alt="learn"/>
                             <p> Обучение</p>
                              
                    </span>          
        
                        
                        
                    <span onClick={()=>{personalSwitch("feedback")} } className="personal_link">
                    <img className="personal_icons" src={sup_icon} alt="support"/>
                              <p>   Обратная связь</p>
                              
                    </span>

                    <span onClick={()=>{personalSwitch("croudfinding")} } className="personal_link">
                    <img className="personal_icons" src={ruble} alt="ruble"/>
                              <p>Краудфайндинг</p>
                              
                    </span>

                </div>
            </div>
        </div>
        <Personalroom cMS={currentMenuScreen}
                       back={personalSwitch} 
        />
        <About cMS={currentMenuScreen}
               back={personalSwitch}
        />
    
        <Letstraining cMS={currentMenuScreen}
                      back={personalSwitch}
        />

        <Feedback cMS={currentMenuScreen}
                      back={personalSwitch}
        />        
        <Croudfinding cMS={currentMenuScreen}
                      back={personalSwitch}
        />

        </div>
        );
    }