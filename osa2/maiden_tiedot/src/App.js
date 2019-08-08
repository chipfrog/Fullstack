import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import AllCountries from './components/AllCountries'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ newFilter, setNewFilter ] = useState('')
  const [ clicked, setClicked ] = useState(null)
  const [ weather, setWeather ] = useState(null)

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFiltering = (event) => {
    setNewFilter(event.target.value)
    setToNull()
  }
  const click = (countryName) => {
    setClicked(countryName)
  }
  const setToNull = () => {
    setClicked(null)
  }
  
  return (
    <div>
      <Filter newFilter={newFilter} handler={handleFiltering} />
      <AllCountries countries={countries} newFilter={newFilter} clickButton={click} 
      clicked={clicked} weather={weather} setWeather={setWeather}/>
    </div>
  )
}

export default App;
