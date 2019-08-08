import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ShowWeather = (props) => {
  const [ weather, setWeather ] = useState(null)
  const api_key = ''
  
  useEffect(() => {
    axios
      .get(`http://api.apixu.com/v1/current.json?key=${api_key}&q=${props.capital}`)
      .then(response => setWeather(response.data.current))
  }, [])

  if (weather === null) {
    return null
  } else {
  
    return (
      <div>
        <h3>Weather in {props.capital}</h3>
        <p><b>temperature: </b>{weather.temp_c} Celsius</p>
        <img src={weather.condition.icon} alt="Saa" width={100} height={100}/>
        <p><b>wind: </b>{weather.wind_kph} kph direction {weather.wind_dir}</p>
      </div>
  )
  }
}

export default ShowWeather