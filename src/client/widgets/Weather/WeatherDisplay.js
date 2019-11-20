import React, { Component } from 'react';

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
        name: "Prague",
        id: "50d0814d44"
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

class WeatherDisplay extends Component{

    componentDidMount(){
        const script = document.createElement("script")
        this.initForcasLink()
        script.async = true
        script.innerHTML = "!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];"+
            "if(!d.getElementById(id)){js=d.createElement(s);js.id=id;"+
            "js.src='https://weatherwidget.io/js/widget.min.js';fjs.parentNode.insertBefore(js,fjs);}}(document,'script','weatherwidget-io-js');"

        this.container.appendChild(script)
        
        // to make sure widget initated 
        setTimeout(()=>{
            if(window.__weatherwidget_init){
                // iframe has been removed
                if(!this.forcastLink.querySelector("iframe"))
                    window.__weatherwidget_init()
            }            
        },500)
    }

    componentDidUpdate(){
        let locationId = this.props.location;
        let targetFrame = this.forcastLink.querySelector("iFrame");
        let location = weatherLocations.filter((location)=>{ return location.id === locationId})[0];

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

    initForcasLink(){
        let locationId = this.props.location;
        let location = weatherLocations.filter((location)=>{ return location.id === locationId})[0];
        this.forcastLink.href = FORECAST_URL+'/en/'+location.id+'/'+location.name.toLowerCase()+'/'
        this.forcastLink.setAttribute("data-label_1",location.name.toUpperCase());
        this.forcastLink.innerText = location.name.toUpperCase();
    }

    render(){
        return(
            <div ref={el =>(this.container = el)}>
                <a className="weatherwidget-io"  data-font="Roboto" href="/"
                    data-theme="weather_one" 
                    ref={el =>(this.forcastLink = el)}>location</a>                
            </div>
        )
    }
}

export default WeatherDisplay