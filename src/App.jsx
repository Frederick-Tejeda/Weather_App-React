import { useState, useEffect } from 'react'
import axios from 'axios'

import { Button, Spinner, Nav, Navbar, Container, NavDropdown, Form } from 'react-bootstrap'
import { Switch, FormGroup, FormControlLabel, Stack, Typography } from '@mui/material'
import AntSwitch from './components/AntSwitch'

import Card from './components/card'
import './App.css'

function App() {

  const [tempC, setTempC] = useState(JSON.parse(localStorage.getItem('Temp')) || true);
  const [lastSearch, setLastSearch] = useState('')

  const HandleTempChange = (e) => {
    setTempC(e.target.checked);
    localStorage.setItem('Temp', e.target.checked)
  }

  const [search, setSearch] = useState("")
  const [place, setPlace] = useState(localStorage.getItem('Place') || "La Romana, DO")
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(true)
  //const [loading, setLoading] = useState(false)


  const GetWeather = async (s) => {
    if(!loading) setLoading(true)
    setLastSearch(s)
    const api_key = 'f170fc3837ef3b55e61196c5b782e597';
    const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${s}&units=${tempC ? 'metric' : 'imperial'}&appid=${api_key}`)
      try{
        setWeatherData(data)
        setLoading(false)
      }catch(error){
        console.log('error', error);
            setLoading(false)
      }
  }

  const LookFor = async () => {
    if(search.length > 0) GetWeather(search)
  }

  useEffect(() => {
    GetWeather(localStorage.getItem('Place') || "La Romana, DO")
  }, [])

  useEffect(() => {
    GetWeather(lastSearch || "La Romana, DO")
  }, [tempC])

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary" style={{borderBottom: "1px solid gray", maxHeight: "10dvh"}}>
        <Container>
          <Navbar.Brand>WeatherWeb</Navbar.Brand>
            <FormGroup>
              <Stack direction="row" spacing={1} alignItems="center">
                  <Typography>F</Typography>
                  <AntSwitch checked={tempC} onChange={HandleTempChange} inputProps={{ 'aria-label': 'ant design' }} />
                  <Typography>C</Typography>
                </Stack>
            </FormGroup>
        </Container>
      </Navbar>
      <div id="div-as-main">
        <section id="searchContainer">
          <input type="text" onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => {if(e.key === 'Enter') LookFor();}} placeholder="Search"/>
          <img src="./search.png" alt="search" onClick={LookFor} />
        </section>
        <main className="main">
          {
            loading ? (
              <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) :
              (
                <Card data={weatherData} />
              )
          }
        </main>
      </div>
    </>
  )
}

export default App
