import React, { useState } from 'react'
import Country from './Country'
import CountryInfo from './CountryInfo'

const showCountries = (props) => {
  const [ info, setInfo ] = useState(false)
  const countriesToShow = props.countries.filter(country =>
  country.name.toLowerCase().includes(props.newFilter.toLowerCase()))

  const handleClick = (e) => {
    e.preventDefault();
    
  }
  
  if (props.newFilter === '' || countriesToShow.length > 10) {
    return (
      'Too many matches, specify another filter'
    )
  } else if (countriesToShow.length === 0) {
    return (
      'No matches'
    )
  } else if (countriesToShow.length <= 10 && countriesToShow.length > 1) {
    return (
      countriesToShow.map(country => <p key={country.name}>{country.name}<button onClick={handleClick}>nappi</button></p>)
    )
  } else {
    return (
      <CountryInfo name={countriesToShow[0].name} capital={countriesToShow[0].capital} 
      population={countriesToShow[0].population} languages={countriesToShow[0].languages}
      flag={countriesToShow[0].flag} />
    )
  }
  
  
}
export default showCountries