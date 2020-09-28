import React from 'react';
import ReactDOM from 'react-dom';


export default class Welcome extends React.Component {

state={
verificationMethod:' ',
};



render(){
 
 const elfStyle = {
 	display:"inline-block",
 	width:'50px',
 	height:'50px',
 	borderRadius:'50%',
 	border:"none",
 	backgroundColor:'red',
 	position:'absolute',
 	right:'15px',
 	bottom:'15px',
 	textTransform:"uppercase",
 	fontWeight:'bold',
 }

	return (
		<div className='verificationMethodScreen' >
		<div className="welcomeScreen" style={this.state.verificationMethod != ' ' ? {display:'none'}:{dispay:'block'}}>
		<p className="welcomeText">Добро пожаловать 
		<br/>
		в ParkOn
		</p>
			    <div className="loginLinksRow">

				  			 <button className="loginLink" onClick={()=>{this.props.authTypeSwitch("Log")}}>
				  			  Войти
				  			  </button>

				  			 <button className="loginLink" onClick={()=>{this.props.authTypeSwitch("Reg")}}>
							  Зарегистрироваться 
				  			  </button>

				</div>
			  </div>
			  <button style={elfStyle} onClick={()=>{this.props.elf('map')}}>Test</button>
			</div>
		);
	}
}