import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import {isUS_Wt,isUS_Dst,getWorldTimeZone,getUTCDate} from '@time-zone/date'

import './card.css'

const backgrounds = [{type: "sunny", color: "#87CEEB"}, {type: "clear", color: "#87CEEB"}, {type: "rain", color: "#B0C4DE"}, {type: "cloud", color: "#CCCCCC"}]

function Card({ data }) {

  const [tempC, setTempC] = useState(JSON.parse(localStorage.getItem('Temp')) || true);

  const backgroundColor = backgrounds.find(b => data.weather[0].description.includes(b.type)) || "f00"

  const weatherDescription = data.weather[0].description[0].toUpperCase() + data.weather[0].description.substring(1, data.weather[0].description.length)

  return (
    <div className="whole-card" style={{ backgroundColor: backgroundColor.color }}>
        <div className="main container card-container">
          <div className="weather-widget">
            <div className="col-xs-12">
              <div className="col-xs-12 col-sm-6 col-sm-offset-3 col-lg-4 col-lg-offset-4 weather-panel" style={{background: backgroundColor.color, boxShadow: "none"}}>
                <div className="col-xs-6">
                  <h2>{data.name}<br/><small>May 24, 2016</small></h2>
                  <p className="h3"><img src={`${data.weather[0].description.includes('cloud') ? 'cloud' : data.weather[0].description.includes('sun') ? 'sunny' : data.weather[0].description.includes('clear') ? 'sunny' : 'rainy'}.png`} alt="r" /> {weatherDescription}</p>
                </div>
                <div className="col-xs-6 text-center">
                  <div className="h1 temperature">
                    <span>{Math.round(data.main.temp)}°{tempC ? 'C' : 'F'}</span>
                    <br/>
                    <small>{Math.round(data.main.temp_min)}° / {Math.round(data.main.temp_max)}°</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <MapContainer className="map-container" center={[data.coord.lat, data.coord.lon]} zoom={10} style={{ height: "200px", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution=''
          />
          <Marker position={[data.coord.lat, data.coord.lon]}>
          <Popup>
            { data.name }
          </Popup>
        </Marker>
        </MapContainer>
    </div>
    )
}

export default Card
