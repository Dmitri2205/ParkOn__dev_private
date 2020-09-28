import React,{Component} from 'react';
 


export default function HomeAdressModal(props){


return(

          <div className="HomeAdressModal"
               style={ props.modalShown === true ? {display:'block',animation:'HomeAdressModal .8s ease'} :{animation:'HomeAdressModalClose .8s ease',display:'none'} }
          >

               <h3>Отлично!</h3>
                <span className="close HomeAdressModal__close"
                 onClick={ ()=>{props.visibilityChange()} } />
               <p style={{width:"80%",margin:'0 auto'}}>Адрес успешно сохранен.
               <br/>
                Изменить его можно
                <br/>
                в личном кабинете
                </p>
          </div>
     );
   }