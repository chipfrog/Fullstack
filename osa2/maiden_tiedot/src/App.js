import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import AllCountries from './components/AllCountries'


const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
        
      })
  }, [])

  const handleFiltering = (event) => {
    setNewFilter(event.target.value)
  }
  return (
    <div>
      <Filter newFilter={newFilter} handler={handleFiltering} />
      <div>
        <AllCountries countries={countries} newFilter={newFilter} />
      </div>  
    </div>
  )
}

export default App;
