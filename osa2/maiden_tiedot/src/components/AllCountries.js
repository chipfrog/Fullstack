import React from 'react'
import CountryInfo from './CountryInfo'
import Country from './Country';

const showCountries = (props) => {
  const countriesToShow = props.countries.filter(country =>
  country.name.toLowerCase().includes(props.newFilter.toLowerCase()))

  if (props.clicked !== null) {
    const country = props.countries.find(country => country.name === props.clicked)
    
    return (
      <CountryInfo name={country.name} capital={country.capital} 
      population={country.population} languages={country.languages}
      flag={country.flag} />
    )  
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
      countriesToShow.map(country => <Country key={country.name} 
        name={country.name} handleClick={() => props.clickButton(country.name)} />)
    )
    
  } else if (countriesToShow.length === 1) {
    return (
      <CountryInfo name={countriesToShow[0].name} capital={countriesToShow[0].capital} 
      population={countriesToShow[0].population} languages={countriesToShow[0].languages}
      flag={countriesToShow[0].flag} />
    )
  } 
}

export default showCountries