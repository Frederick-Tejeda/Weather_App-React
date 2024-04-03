import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './card.css'

const backgrounds = [{type: "sunny", color: "#87CEEB"}, {type: "clear", color: "#87CEEB"}, {type: "rain", color: "#B0C4DE"}, {type: "cloud", color: "#CCCCCC"}, {type: "snowy", color: "#F0F8FF"}, {type: "fog", color: "#E0E0E0"}, {type: "stormy", color: "#696969"}, {type: "windy", color: "#F5F5F5"}, {type: "hail", color: "#A9A9A9"}]
const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec']

function Card({ data, time }) {

  const [tempC, setTempC] = useState(JSON.parse(localStorage.getItem('Temp')) || true);
  const [value, setValue] = useState(new Date());

  let currentTime = time.split(' ')[0]
  currentTime = currentTime.split('-')

  let currentClock = time.split(' ')[1]
  currentClock = currentClock.split(':')

  const backgroundColor = backgrounds.find(b => data.weather[0].description.includes(b.type)) || "f00"

  const weatherDescription = data.weather[0].description[0].toUpperCase() + data.weather[0].description.substring(1, data.weather[0].description.length)

  const weatherImage = `${data.weather[0].description.includes('cloud') ? 'cloud' : data.weather[0].description.includes('sun') ? 'sunny' : data.weather[0].description.includes('clear') ? 'sunny' : data.weather[0].description.includes('snow') ? 'snowy' : data.weather[0].description.includes('fogg') ? 'fog' : data.weather[0].description.includes('mist') ? 'fog' : data.weather[0].description.includes('storm') ? 'stormy' : data.weather[0].description.includes('wind') ? 'windy' : data.weather[0].description.includes('hail') ? 'hail' : 'rainy'}.png`

  return (
    <div className="whole-card" style={{ backgroundColor: backgroundColor.color }}>
        <div className="main container card-container">
          <div className="weather-widget">
            <div className="col-xs-12">
              <div className="weather-panel" style={{background: backgroundColor.color, boxShadow: "none"}}>
                <section>
                  <div className="h2">{data.name}</div>
                  <div className="h5">{months[+currentTime[1]]} {currentTime[2]}, {currentClock[0]}:{currentClock[1]}</div>
                  <div className="h2">
                    <img src={weatherImage} alt="r" /> {weatherDescription}
                  </div>
                </section>
                <section style={{textAlign: 'center', minWidth: '80px'}}>
                    <div className="h1" style={{fontSize: '50px'}}>{Math.round(data.main.temp)}°{tempC ? 'C' : 'F'}</div>
                    <div className="h5">{Math.round(data.main.temp_min)}° / {Math.round(data.main.temp_max)}°</div>
                </section>
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
