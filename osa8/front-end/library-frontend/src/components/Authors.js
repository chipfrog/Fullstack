import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, EDIT_AUTHOR } from '../queries'

const Authors = (props) => {
  const authors = useQuery(ALL_AUTHORS)
  const [name, setName] = useState('')
  const [born, setBornTo] = useState('')

  const [ changeYear ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ {query: ALL_BOOKS}, {query: ALL_AUTHORS} ]
  })
  
  if (authors.loading) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    changeYear({ variables: { name, born: parseInt(born) } })
    setName('') 
    setBornTo('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <div>
        <h2>Set birhtyear</h2>
        <form onSubmit={submit}>
          <div>
            name
            <input 
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
          </div>
          <div>
            born
            <input 
              type='number'
              value={born}
              onChange={({ target }) => setBornTo(target.value)}
            />
          </div>
          <button type='submit'>update author</button>
        </form>
      </div>

    </div>
  )
}

export default Authors
