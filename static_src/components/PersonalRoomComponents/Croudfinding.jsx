import React from "react";
import ReactDOM from 'react-dom';
import back_personal from '../img/back_personal.png';
import { YMaps, Map, Placemark, ZoomControl, GeolocationControl, Button, Polygon} from "react-yandex-maps";


export default class Croudfinding extends React.Component{
	constructor(props) {
	  super(props);
	  this.croudfinding = React.createRef();
	}

state = {
    homeRoute: {},
    //координаты местоположения
    mapData: {
        center: [55.899325, 37.401674],
        zoom: 17,
    },
     coordinates:  [
            [55.899325, 37.401674]
        ],
 }
 componentWillReceiveProps(props){
 	console.log(props.cMS);
 	if (props.cMS === 'croudfinding') {
		this.croudfinding.current.style.animation = "personal__screens .7s ease";
		this.croudfinding.current.style.animationFillMode = "forwards";
 	};

 };
 delay = ()=>{
		setTimeout(()=>{
			return {display:'none'};
		},1000)
	}

render(){
	
        return(
            <div ref={this.croudfinding} className="Croudfinding"  style={this.props.cMS === "croudfinding" ? {display:'block'} : this.delay() }>
             <div className="Croudfinding__header">
                 <img src={back_personal} onClick={ ()=>{this.props.back("back")} } className="backToPersonal" />
               <h1>Краудфайндинг</h1>
            </div>
           	<div>
           		 <YMaps preload>
                    <Map className = "CroudMap"
                    	 style={{borderRadius:'10px'}}
                         defaultState={this.state.mapData}
                         onLoad={ymaps => this.ymaps = ymaps}>
                        <Polygon className='polygonKhimki'
                                 geometry={
                                    [
                                      [
                                        [55.898916, 37.401508],
                                        [55.898921, 37.402601],
                                        [55.898712, 37.402612],
                                        [55.898712, 37.402191],
                                        [55.898815, 37.402190],
                                        [55.8988117, 37.401245],
                                        [55.899665, 37.40115],
                                        [55.8997, 37.402350],
                                        [55.899950, 37.402330],
                                        [55.899950, 37.402500],//10
                                        [55.899665, 37.402495],
                                        [55.899633, 37.401269],
                                        [55.898916, 37.401350]
                                      ]
                                    ]
                                }
                                options={{
                                    fillColor:'#00FF00',
                                    strokeColor:'#0000ff',
                                    opacity:0.5,
                                    strokewidth:3,
                                    strokeStyle:'shortDash',
                                }}  
                                />
                        <ZoomControl options={{float: 'right', size: "small",layout:'round#zoomLayout', position: {right: 12, bottom: 250}}}/>
                    </Map>
                </YMaps>
           	</div>
			<div className="Croudfinding__scale"><span className="scale__fill"></span><p>0%</p></div>
			<p className='summ__count'>Собрано:<span>0 ₽/100000 ₽</span></p>					
        </div>
          ); 
      }
}