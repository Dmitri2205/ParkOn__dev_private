import React, {Component} from 'react'
import { YMaps, Map, Placemark, ZoomControl, GeolocationControl, Button, Polygon} from "react-yandex-maps";
import TouchBar from './modules/TouchBar';
import Personal from './PersonalRoomComponents/Personal';




import "@babel/polyfill";
require("@babel/polyfill");
export default class MapModule extends Component{

    constructor(props) {
      super(props);
        this.modal = React.createRef();
    }

    static defaultProps = {
        homeAddress: " ",
        //координаты маркеров (камер)
        coordinates:  [
            [55.899325, 37.401674]
        ],


    };

    state = {
        homeRoute: {},
        geolocation: null,
        showRoute: false,
        //координаты местоположения
        mapData: {
            center: [55.899325, 37.401674],
            zoom: 16,
        },
        personalShown:false,
    };

   componentDidMount(prevProps){
        if (this.props.streamToCam) {
            setTimeout(()=>{
            this.addRoute();
            },1000)
        };
    }

    _onButtonClick = (event) => {
        console.log("stream redirect");
        this.props.streamSwitch();
    };

    getGeoLocation = () =>{

       return new ymaps.geolocation.get({
            // Выставляем опцию для определения положения
            provider: 'browser', // - средствами браузера или provider: 'yandex'-по ip
            // Карта автоматически отцентрируется по положению пользователя.
            mapStateAutoApply: true
        }).then(function (result) {
            return result.geoObjects.position;
        });
    };

    addRoute = async () => {

        if (this.ymaps && this.map) {
            const {coordinates} = this.props;
            const position =  await this.getGeoLocation();


            const multiRoute = new ymaps.multiRouter.MultiRoute(
                {
                    // Описание опорных точек мультимаршрута (должно быть местоположение и дом)
                    referencePoints: [position,[55.899325, 37.401674]],
                    // Параметры маршрутизации.
                    params: {
                        // Ограничение на максимальное количество маршрутов, возвращаемое маршрутизатором.
                        results: 1
                    }
                },
                {
                    // Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.
                    boundsAutoApply: true,

                    // Внешний вид линии маршрута.
                    routeStrokeColor:'#69FFFD',
                    routeStrokeWidth:3,
                    routeActiveStrokeWidth: 3,
                    routeActiveStrokeColor: '#39FDB6',
                    // Задаем собственную картинку для последней путевой точки.
                    wayPointFinishImageHref: "static/build/markGreen.png",
                    wayPointFinishIconImageSize: [30, 30],
                    //wayPointFinishIconImageOffset: [-15, -15]
                }
            );
            console.log(position);
             this.map.geoObjects.add(multiRoute);
             this.homeRoute = multiRoute;
            this.setState({
                showRoute: true,
            });
        }
    };

    removeRoute = () => {
        this.map.geoObjects.remove(this.homeRoute);
        this.setState({
            showRoute: false,
            homeRoute: {}
        });
    };


    homeRouteButton = ()=>{
        const {showRoute} = this.state;
        if (showRoute === true) {
            return this.removeRoute();
        }else if(showRoute === false){
            return this.addRoute();
        }
    };

    personalShow = ()=>{
        const {personalShown} = this.state;
        if (personalShown) {
            this.setState({personalShown:false});
        }else{
            this.setState({personalShown:true});
        }
    }
    render() {
        const { coordinates } = this.props;
        const { mapData, showRoute, personalShown } = this.state;
        return (
            <div className='MapWraper'>
                <div>
                <YMaps preload>
                    <Map className = "map"
                         defaultState={mapData}
                           instanceRef={ref => (this.map = ref)}
                         onLoad={ymaps => this.ymaps = ymaps}>
                        {coordinates.map((coordinate, key) => {
                            return (
                                <Placemark key={key}
                                           geometry={coordinate}
                                           onClick={(event) => this._onButtonClick(event)}
                                           options={{
                                           iconLayout: 'default#image',
                                           // Своё изображение иконки метки.
                                           iconImageHref: 'static/build/cameraMap.png',
                                           // Размеры метки.
                                           iconImageSize: [40,40]
                                           }}

                                />
                            );
                        })}
                        <Polygon className='polygonKhimki'
                                 onClick={ (event)=>{this.placesShow()}}
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
                  <div className="placesCount"
                        ref={this.modal}
                  >
                        <p>Свободных мест:5</p>
                    </div>
                </div>
               
               <div className="loader"
                    style={{ display:'block',
                            width: '100%',
                            height: '50%',
                            textAlign: 'center',
                            position: 'absolute',
                            top: '25%',
                            zIndex:' -9999',}}
               >
                   <h1 >Загрузка...</h1>
                   <img src="static/build/loader.gif"/>
                </div>
                
                
                <TouchBar homeRouteButton={this.homeRouteButton}
                          personalShow={this.personalShow}
                />
                
                    <Personal visibility={personalShown}
                              personalShow={this.personalShow}
                    />
            
    
<script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;apikey=b2ee8f08-a037-4bb4-be59-dc5ed72ce461" type="text/javascript">
        </script>
                </div>    

        );
    }
}
