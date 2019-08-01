import axios from 'axios'

const url = 'http://localhost:3001/persons'

const getContacts = () => {
  const request = axios.get(url)
  return request.then(response => response.data)
}

const create = newContact => {
  const request = axios.post(url, newContact)
  return request.then(response => response.data)
}

const update = (person, newNumber) => {
  const request = axios.put(`${url}/${person.id}`, {
    name: person.name,
    number: newNumber
  })
  return request.then(response => response.data)
}

const deleteContact = (id) => {
  const request = axios.delete(`${url}/${id}`)
  return request.then(response => response.data)
}

export default {getContacts, create, update, deleteContact}