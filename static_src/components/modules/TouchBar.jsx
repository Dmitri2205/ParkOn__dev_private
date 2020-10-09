import React, {Component} from 'react';
import Microphone from "../img/Microphone.png";
import home from "../img/home.png";
import Loop from "../img/Loop.png";
import Burger_menu from "../img/Burger_menu.png";
 


export default function TouchBar(props){
     return(
          <div className="bottomBarWraper">
               <span href="#" onClick={()=>{console.log('click 2')}} >
               <img src={Loop} alt="loop"/>
               </span>
               <span onClick={ ()=>{console.log('click 1')}}> 
               <img src={Microphone} alt="mic"/>
               </span>
               <span onClick={ ()=> {props.homeRouteButton()}}> 
               <img src={home} alt="home"/>
               </span>
               <span href="#" onClick={()=>{props.personalShow()}}> 
               <img src={Burger_menu} alt="menu"/>
               </span>
           </div>
     )
}
