import React, { Component } from 'react';
import styles from './Weather.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);


// directly copied locations from weatherwidget-io
// id should match
const weatherLocations = [
    {
        name: "Espoo",
        id: "60d2124d66",
    },
    {
        name: "Helsinki",
        id: "60d1724d94",
    },
    {
        name: "Kathmandu",
        id: "27d7285d32",
    },
    {
        name: "Madrid",
        id: "40d42n3d70",
    },
    {
        name: "Rovaniemi",
        id: "66d5025d73",
    }                
]

const widgetDefaultAttrs = {
    class: "weatherwidget-io",
    font: "Roboto",
    theme: "weather_one" 
}

const FORECAST_URL = "https://forecast7.com"
const PROVIDER_URL = "https://weatherwidget.io"

class Weather extends Component{
    state= {
        location:'60d2124d66'
    }

    componentDidMount(){
        const script = document.createElement("script")
        this._initForcasLink()
        script.async = true
        script.innerHTML = "!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];"+
            "if(!d.getElementById(id)){js=d.createElement(s);js.id=id;"+
            "js.src='https://weatherwidget.io/js/widget.min.js';fjs.parentNode.insertBefore(js,fjs);}}(document,'script','weatherwidget-io-js');"

        this.container.appendChild(script)        
    }

    _initForcasLink(){
        let locationId = this.state.location;
        let location = weatherLocations.filter((location)=>{ return location.id === locationId})[0];
        this.forcastLink.href = FORECAST_URL+'/en/'+location.id+'/'+location.name.toLowerCase()+'/'
        this.forcastLink.setAttribute("data-label_1",location.name.toUpperCase());
        this.forcastLink.innerText = location.name.toUpperCase();
    }

    locationChange = (event)=>{
        let locationId = event.target.value;
        let targetFrame = this.forcastLink.querySelector("iFrame");
        let location = weatherLocations.filter((location)=>{ return location.id === locationId})[0];

        this.setState({location:locationId})

        // load weather for new location
        let pstMessage = {
            id: targetFrame.id,
            font: widgetDefaultAttrs.font,
            class: widgetDefaultAttrs.class,
            theme: widgetDefaultAttrs.theme,
            href: FORECAST_URL+'/en/'+location.id+'/'+location.name.toLowerCase()+'/',
            label_1: location.name.toUpperCase()
        }
        targetFrame.contentWindow.postMessage(pstMessage,PROVIDER_URL)
        this.forcastLink.href = pstMessage.href
    }

    render() {
        return (

        <div className="card ">
            <div className="header">
                <h4 className="title">Weather</h4>
            </div>
            <div className="content">
                <div id="WeatherInfo" ref={el =>(this.container = el)}>
                    <form name="weatherInfoForm" className={cx('form-inline', 'WeatherInfo__form')}>
                        <div className="form-group">
                            <label htmlFor="weatherLocationSelect" className="control-label">Location</label>
                            <select id="lunchFeedResturantSelect" className="form-control"
                                onChange={this.locationChange} 
                                value={this.state.location}>
                                <option value="60d2124d66">Espoo</option>
                                <option value="60d1724d94">Helsinki</option>
                                <option value="27d7285d32">Kathmandu</option>
                                <option value="66d5025d73">Rovaniemi</option>
                                <option value="40d42n3d70">Madrid</option>
                            </select>
                        </div>                        
                    </form>
                    <a className="weatherwidget-io"  data-font="Roboto" href="/"
                        data-theme="weather_one" 
                        ref={el =>(this.forcastLink = el)}>location</a>
                                       
                </div>
            </div>
        </div>
        )
    }
}

export default Weather