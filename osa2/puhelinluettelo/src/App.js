import React, { useState } from 'react'
import Contacts from './components/Contacts'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [ persons, setPersons] = useState([
    
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  
  const addName = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }
    if(!persons.map(person => person.name).includes(newName)) {
      setPersons(persons.concat(person))
      setNewName('')
      setNewNumber('')
    } else {
      window.alert(`${newName} is already added to phonebook`)
    }
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFiltering = (event) => {
    setNewFilter(event.target.value)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handler={handleFiltering}/>
      <h2>add a new</h2>
      <PersonForm addName={addName} name={newName} nameHandler={handleNameChange}
      number={newNumber} numberHandler={handleNumberChange} />
      <h2>Numbers</h2>
        <Contacts persons={persons} newFilter={newFilter}/>
    </div>
  )
}
export default App