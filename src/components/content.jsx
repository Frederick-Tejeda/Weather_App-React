import { useState, useEffect } from 'react'
import axios from 'axios'

import { Button } from 'react-bootstrap'

import searchIcon from '../assets/search.png'

function Content(){

	const [search, setSearch] = useState("")
	const [place, setPlace] = useState(localStorage.getItem('Place') || "La Romana, DO")
	const [weatherData, setWeatherData] = useState(null)

	const GetWeather = async (s) => {
		const api_key = 'f170fc3837ef3b55e61196c5b782e597';
		await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${s}&units=metric&appid=${api_key}`)
        .then((res) => {
            console.log('res', res.data);
            setWeatherData(res.data)
        })
        .catch((error) => {
            console.log('error', error);
        });
	}

	const LookFor = async () => {
		console.log('LookFor', search)
		if(search.length > 0) GetWeather(search)
	}

	useEffect(() => {
		//GetWeather(localStorage.getItem('Place') || "La Romana, DO")
	}, [])

	return(
		<>
			<section>
				<input type="text" onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => {if(e.key === 'Enter') LookFor();}} placeholder="Search"/>
				<img src={searchIcon} alt="search" onClick={LookFor} />
			</section>
			{
				weatherData ? (
					<section>
					  <h2>{weatherData.name}</h2>
			          <p>Temperature: {weatherData.main.temp}°C</p>
			          <p>Description: {weatherData.weather[0].description}</p>
			          <p>Feels like : {weatherData.main.feels_like}°C</p>
			          <p>Humidity : {weatherData.main.humidity}%</p>
			          <p>Pressure : {weatherData.main.pressure}</p>
			          <p>Wind Speed : {weatherData.wind.speed}m/s</p>
	          		</section>
				) : 
				<section></section>
			}
		</>
	)
}

export default Content