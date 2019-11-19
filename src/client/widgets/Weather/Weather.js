import React, { Component } from 'react'
import styles from './Weather.scss'
import classNames from 'classnames/bind'
import WeatherDislay from './WeatherDisplay'

const cx = classNames.bind(styles)

class Weather extends Component{
    state = {
        location:'60d2124d66'
    }

    locationChange = (event)=>{
        let locationId = event.target.value;
        this.setState({location:locationId})
    }

    render() {
        return (

        <div className="card " {...this.props} ref={this.props.innerRef}>
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
                                <option value="50d0814d44">Prague</option>
                                <option value="40d42n3d70">Madrid</option>
                            </select>
                        </div>                        
                    </form>
                    <WeatherDislay location={this.state.location} />
                </div>
            </div>
        </div>
        )
    }
}

export default Weather