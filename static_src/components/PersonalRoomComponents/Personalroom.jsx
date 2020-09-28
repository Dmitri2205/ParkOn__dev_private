import React from "react";
import ReactDOM from 'react-dom';
import about_icon from "../img/about_icon.png";
import learn_icon from "../img/learn_icon.png";
import sup_icon from "../img/sup_icon.png";
import logo from '../img/logo.png';
import private_personal from '../img/private_personal.png';
import back_personal from '../img/back_personal.png';
import HomeAdressModal from '../modules/HomeAdressModal';


export default class Personalroom extends React.Component {
    constructor(props) {
      super(props);
    
      this.personal = React.createRef();
    }

    state={
        homeAdress:' ',   
        modalVisible:false,
    };

inputHandler = (event) =>{
setTimeout(()=>{
this.setState({homeAdress: event.target.value});
    },100);
};


componentDidMount(){
    const adress = localStorage.getItem('homeAdress');
    if (adress) {
        this.setState({homeAdress:adress});
    }else{
        console.log('localstorage пуст')
    };
};
componentWillReceiveProps(props){
    if (props.cMS === 'personalRoom') {
      this.personal.current.style.animation = "personal__screens .7s ease";
      this.personal.current.style.animationFillMode = "forwards";
    };

};



saveHomeAdress = () => {
    if(this.state.homeAdress  && localStorage.getItem('homeAdress')){
        localStorage.setItem("homeAdress",`${this.state.homeAdress}`);
        this.setState({modalVisible:true});
    }else if ( localStorage.getItem('homeAdress') === true) {
        alert('адрес забит');
    };
};



visibilityChange = () => {
    if (this.state.modalVisible === true) {
        this.setState({modalVisible:false});
    }else{
        this.setState({modalVisible:true});
    };
}


    render(){
        const {modalVisible} = this.state;
        return (
        <div ref={this.personal} className="personal" style={this.props.cMS === 'personalRoom' ? {display:'block',right:'0px'}:{display:'none',right:"-100vw"}}>
           
            <div className="personal_top">
                <div className="personalRoomHeader">
                
                <div onClick={ ()=>{this.props.back("back")} } className="backToPersonal">
                <img src={back_personal} />
                </div>

                      <p>Личный кабинет</p>
                  <img  src={private_personal} className="personalRoomHeaderImage"/>
                       
                </div>  
                <div className="example">
            <p>ivanovivan@mail.ru</p>   
            </div>

            </div>

            

            <div className="linkpersonal">

            <div className="email_personal">
                <p>Вы можете изменить домашний адрес. </p>            
                       <input  type="text"
                        placeholder="Введите адрес"
                        onChange={ ()=>{ this.inputHandler(event) }}
                        />

                    </div>              
              <button className="save" onClick={ ()=>{this.saveHomeAdress()} }>
                 Сохранить
              </button>

            </div>
            <HomeAdressModal 
                    visibilityChange={this.visibilityChange}
                    modalShown={modalVisible}
            />
        </div>
        );
    }
 }