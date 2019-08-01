import React, { useState, useEffect } from 'react'
import Contacts from './components/Contacts'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Communication from './services/Communication'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ messageStyle, setMessageStyle ] = useState('')
  
  useEffect(() => {
    Communication
      .getContacts()
      .then(initialPersons => {setPersons(initialPersons)})
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }
    if (newName === '') {
      setMessage(`Name can't be empty!`)
      setMessageSettings('error')
      
    } 
    else if (!persons.map(person => person.name).includes(newName)) {
    Communication
      .create(person)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
        
        setMessage(`${person.name} was added succesfully!`)
        setMessageSettings('success')
        setNewName('')
        setNewNumber('')
    
    } else if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) { 
        const personToUpdate = persons.find(person => person.name === newName)
        const index = persons.findIndex(person => person.name === newName)
        update(personToUpdate, index)
    }
  }
  const update = (personToUpdate, index) => {
    Communication
          .update(personToUpdate, newNumber)
          .then(response => {
            setMessage(`Updated ${personToUpdate.name}'s number succesfully!`)
            setMessageSettings('success')
            updateContactsWithNewNumber(index)
            console.log(newNumber)
          })
          .catch(error => {
            setMessage(`Information of ${personToUpdate.name} has already been removed from the server`)
            setMessageSettings('error') 
            hideDeleted(personToUpdate.id)
          })
    
  }
  
  const handleDelete = (id) => {
    const personToDelete = persons.find(person => person.id === id)
    if (window.confirm('Delete ' + personToDelete.name + '?')) {
      Communication
        .deleteContact(id)
        .then(setMessage(`Removed ${personToDelete.name} succesfully!`), setMessageSettings('success'))
          
      hideDeleted(id) 
    }
  }

  const setMessageSettings = (style) => {
    setMessageStyle(`${style}`)
    setTimeout(() => {setMessage(null)}, 3000)
  }
  
  const hideDeleted = (id) => {
    const newList = persons.filter(person => person.id !== id)
    setPersons(newList) 
  }

  const updateContactsWithNewNumber = (index) => {
    const copy = [...persons]
    copy[index].number = newNumber  
    setPersons(copy)
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
        <Notification message={message} class={messageStyle} />
        <Filter newFilter={newFilter} handler={handleFiltering}/>
      <h2>add a new contact</h2>
        <PersonForm addName={addName} name={newName} nameHandler={handleNameChange}
        number={newNumber} numberHandler={handleNumberChange} />
      <h2>Numbers</h2>
        <Contacts persons={persons} deletePerson={handleDelete} newFilter={newFilter}/>
    </div>
  )
}
export default App