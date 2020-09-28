import React from "react";
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



export default class Personal extends React.Component {

        state={
            currentMenuScreen:" ",
        };

    

    

personalSwitch=(s)=>{
    if (s === "personalRoom") {
        this.setState({currentMenuScreen:s});
    }else if (s === "about") {
        this.setState({currentMenuScreen:s});
     }else if (s === "croudfinding") {
        this.setState({currentMenuScreen:s});
    }else if (s === "letsTraining") {
        this.setState({currentMenuScreen:s});
        
    }else if (s === "feedback") {
        this.setState({currentMenuScreen:s});
    }else if (s === "back") {
        this.setState({currentMenuScreen:' '});
    };
}

    render(){
    const {currentMenuScreen} = this.state;
    const {visibility,personalShow} = this.props;
        return (

            <div className="verificationMethodScreen">
        <div className="personal" style={currentMenuScreen && visibility ? {right:'0'} : {display:'none',right:'-100%'}}>
            <div className="personal_top">
                <div className="personal_header">
                
                      <p>Меню</p>
                  <span className="close" onClick={ ()=>{personalShow()} } />   
                </div>  
            </div>
            

            

            <div className="linkpersonal">
          <div className="linkList">
                    
                    <span onClick={()=>{this.personalSwitch("personalRoom")} } className="personal_link">
                    <img className="personal_icons" src={private_personal}/>
                            <p>Личный кабинет</p>                    
                    </span>

                    <span onClick={()=>{this.personalSwitch("about")} } className="personal_link">
                    <img className="personal_icons" src={about_icon}/>
                            <p>О приложении</p>   
                                
                    </span>

                    <span onClick={()=>{this.personalSwitch("letsTraining")} } className="personal_link">    
                    <img className="personal_icons" src={learn_icon}/>
                             <p> Обучение</p>
                              
                    </span>          
        
                        
                        
                    <span onClick={()=>{this.personalSwitch("feedback")} } className="personal_link bottom">
                    <img className="personal_icons" src={sup_icon}/>
                              <p>   Обратная связь</p>
                              
                    </span>

                    <span onClick={()=>{this.personalSwitch("croudfinding")} } className="personal_link bottom">
                    <img className="personal_icons" src={ruble}/>
                              <p>Краудфайндинг</p>
                              
                    </span>

                </div>
            </div>
        </div>
        <Personalroom cMS={currentMenuScreen}
                       back={this.personalSwitch} 
        />
        <About cMS={currentMenuScreen}
               back={this.personalSwitch}
        />
    
        <Letstraining cMS={currentMenuScreen}
                      back={this.personalSwitch}
        />

        <Feedback cMS={currentMenuScreen}
                      back={this.personalSwitch}
        />        
        <Croudfinding cMS={currentMenuScreen}
                      back={this.personalSwitch}
        />

        </div>
        );
    }
 }