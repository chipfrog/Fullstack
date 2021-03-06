import React from 'react'
import Person from './Person'


const showContacts = (props) => {
  const contactsToShow = props.persons.filter(person => 
  person.name.toLowerCase().includes(props.newFilter.toLowerCase()))
  
  return (
    contactsToShow.map(person => 
      <Person key={person.id} name={person.name} 
      number={person.number} deletePerson={() => props.deletePerson(person.id)}/>)
    )
  
  }

export default showContacts