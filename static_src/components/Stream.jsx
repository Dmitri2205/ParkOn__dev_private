import React, {useEffect} from "react";
import ReactDOM from 'react-dom';
import {Link} from "react-router-dom";
import axios from "axios";
import JSMpeg from 'jsmpeg-player';


export default class Stream extends React.Component {

    state={
    	streamID:'5edfb8ff6b851b056542d017',
      userID:'5edfbda05d5c21099f257ba5',
      portID:" ",
      terminated:false,
      countFree:0,
    };




    componentDidMount() {
    //   console.log('mount');
    //   this.getStreamPort();
    this.dotGen()
    };
    // componentDidUpdate(){
    //   if (this.state.portID) {
    //   this.playerRendering();
    //   }else if (this.state.portID != ' ') {
    //   this.playerRendering();
    //   }
    // };

    // componentDidUnmount(){
    //     console.log('')
    //      axios.post(` http://parkon.fvds.ru/api/stream/close/${this.state.streamID}`,{id:`${this.state.userID}`});
         
    // };





    dotGen = () => {
      setTimeout(()=>{
      this.setState({countFree:5});
      console.log(this.state.countFree);
      },1000)
    }




//--------------------------------__________________--------------------------------- //


//---------запросы user id и stream id для определения порта потока-------//


    // getStream = () => {
    //   console.log('ID потока получен');
    //   axios.get('http:\//localhost:3000/api/stream');
    // };

    // getUser = () => {
    // console.log('User ID получен');
    //     return axios.get('http:\//localhost:3000/api/user/');
    // };

//      getStreamPort = () => {
//        axios.post(` http://parkon.fvds.ru/api/stream/open/${this.state.streamID}`,{ id:`${this.state.userID}`})
//        .then((response)=>{


//         console.log('Порт получен');
//         console.log(response.data.output[0].result);
//             const raid = response.data.output[0].result;
//             console.log("Объект:" + raid);
//             console.log(response.data.port);
//             this.setState({portID:response.data.port,
//                             places:raid
//             });
//             const free = this.state.places.filter( (item)=> item === 1 );
//               console.log(free);
//               this.setState({countFree:free});
//        },
//             (error) => {  
//             alert('Что-то пошло не так');
//             }
//         )
//       };

// //--------------------------------------------------------------------------//





//     playerRendering = () => {
//       const {portID} = this.state;
//       setTimeout(()=>{

//       const streamURL = `ws://parkon.fvds.ru:${portID}`;
//       let canvas = document.getElementById('canvas');
//       const player = new JSMpeg.Player(streamURL, {canvas} );
//       console.log('player create');
//       },500);
//     };



    streamActions=()=>{
    
      if (this.state.terminated) {
          this.setState({terminated:false});
      }else{
          this.setState({terminated:true});
      };


    //   const {portID} = this.state;
    //   const ws = new WebSocket(`ws://parkon.fvds.ru:${portID}`);

    //   if (this.state.terminated === false) {
    //       this.setState({terminated:true});
    //   axios.post(`http://parkon.fvds.ru/api/stream/close/${this.state.streamID}`,{id:`${this.state.userID}`});
    //    ws.close();       
    //  }else{
    //   setTimeout(()=>{
    //   this.getStreamPort();
    //   this.setState({terminated:false})
    //   },500);
    //  };
    //   JSMpeg.Player(ws,{canvas});
    }





    render(){
      const {portID,terminated,countFree} = this.state;
        return (
        <div id="Stream">
          <div className="player">
                          <p className="terminatedText"
                           style={terminated === true ? {display:"block"}:{display:'none'} }>
                           Трансляция остановлена
                           </p>
        	   
                           <video autoPlay="autoPlay" muted playsInline loop="loop" style={terminated ? {opacity:0}:{opacity:1}}>
                            <source src="./static/build/video.mp4"
                                     type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
                            />
                           </video>
          </div>

              <button  className="passwordSendButton streamActions__button"
                       onClick={()=>{this.props.streamSwitch()}} 
                       style={{display:"block"}}>
                    <p>Построить маршрут</p>
               </button>      



               <button  className="passwordSendButton streamActions__button"
                    onClick={()=>{this.streamActions()}} 
                    style={terminated === false || undefined ? {display:'block'}:{display:'none'}} >
                    <p>Завершить трансляцию</p>
               </button>          
          
                  <button  className="passwordSendButton streamActions__button"
                       onClick={()=>{this.streamActions()}}
                       style={terminated === true || undefined ? {display:'block'}:{display:'none'}} >
                       <p>Начать трансляцию</p>
                  </button>

                  <div className="screenshotWraper">
                  <span  className="dottedButton"
                            style={countFree < 1 ? {backgroundColor:"#FF0000"}:{backgroundColor:" #58FFB2"}}
                      >
                       <p>{countFree}</p>
                  </span>
                  <img src="static/build/screenShot.jpg"/>
                  </div>
            <script src="./modules/jsmpeg.min.js"></script>
        </div>

      	);
      }
    }