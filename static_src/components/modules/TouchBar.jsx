import React, {Component} from 'react';
import Microphone from "../img/Microphone.png";
import home from "../img/home.png";
import Loop from "../img/Loop.png";
import Burger_menu from "../img/Burger_menu.png";
 


export default class TouchBar extends Component{


render(){
     const {homeRouteButton,personalShow} = this.props;
return(

          <div className="bottomBarWraper">
                    <span href="#" onClick={()=>{console.log('click 2')}} >
                    <img src={Loop}/>
                    </span>
                    <span onClick={ ()=>{console.log('click 1')}}> 
                    <img src={Microphone}/>
                    </span>
                    <span onClick={ ()=> {homeRouteButton()}}> 
                    <img src={home}/>
                    </span>
                    <span href="#" onClick={()=>{personalShow()}}> 
                    <img src={Burger_menu}/>
                    </span>
                </div>
)
}
}