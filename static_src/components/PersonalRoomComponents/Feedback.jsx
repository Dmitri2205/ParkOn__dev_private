import React from "react";
import ReactDOM from 'react-dom';
import back_personal from '../img/back_personal.png';
import sup_icon from "../img/sup_icon.png";
import axios from 'axios';


export default class Feedback extends React.Component {
  constructor(props) {
    super(props);
  
    this.feedback = React.createRef();
  };

  componentWillReceiveProps(props){
    if (props.cMS === 'feedback') {
      this.feedback.current.style.animation = "personal__screens .7s ease";
      this.feedback.current.style.animationFillMode = "forwards";
    };
  };

  state={
      textareaInput:' ',
      feedbackSended:false,
      userID:'5edfbda05d5c21099f257ba5',
  };


  textareaInput = (event)=>{
      const value = event.target.value;
      console.log(value);
      setTimeout(()=>{
      this.setState({textareaInput:value});
      },100)
  };


  feedbackSend = () => {
      axios.post(`http://parkon.fvds.ru/api/mail/${this.state.userID}`,{
        "to": "Info.ParkOn@mail.ru",
        "subject": "Тестовое письмо для проекта",
        "text": `${this.state.textareaInput}`,
        "html": `<div style='border: 2px solid green;>${this.state.textareaInput}<br/><strong>${this.state.userID}<strong></div>`
      })
      .then((response)=>{
        
      this.setState({feedbackSended:true});
      alert('Ваше обращение отправлено!');
      },
      (error) => {  
          alert('Что-то пошло не так.Обращение не отправлено');
          }
      )
  }


    render(){
        return (

          <div className="feedback" 
                ref={this.feedback}
                style={this.props.cMS === "feedback" ? {display:'block'}:{display:'none'}}>
                    <div className="feedback_header">
                        
                        <div onClick={ ()=>{this.props.back("back")} } className="backToPersonal">
                          <img src={back_personal} />
                        </div>
                        
                          <p style={{color:"white",fontSize:'22px',margin:0}}>Обратная связь</p>
                        <img src={sup_icon}/>
                       </div>

            <div className='feedbackArea'>
            <textarea  name="FeedbackArea"  cols="30" rows="10" style={ {resize:"none"} }
                       placeholder="Вы можете оставить отзыв, сообщить о неполадке или просто пообщаться с нами;) "
                       onChange={ ()=>{this.textareaInput(event)} }>
                       </textarea> 
            

            <button className="send_it"
                    onClick={()=>{this.feedbackSend()}} >
                Отправить 
            </button>
            </div>
          </div>
        );
      }
    }