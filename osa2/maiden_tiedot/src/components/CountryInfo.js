import React from 'react'
import Weather from './Weather'

const CountryInfo = (props) => {
  const languageList = props.languages.map(language => 
    <li key={language.name}>{language.name}</li>)
  
  return (
    <div>
      <h2>{props.name}</h2>
      <p>Capital: {props.capital}</p>
      <p>Population: {props.population}</p>

      <h3>Languages</h3>
      <div>
        {languageList}
      </div>
      <p></p>
        <img src={props.flag} alt="Lippu" width={100} height={100}/>
      <Weather capital={props.capital} /> 
    </div>
  )
}

export default CountryInfo