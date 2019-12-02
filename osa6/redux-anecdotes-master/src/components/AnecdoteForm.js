import React from 'react'
import { newAnecdote } from '../reducers/anecdoteReducer'

const CreateAnecdote = (props) => {
  const AddAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.store.dispatch(newAnecdote(content))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={AddAnecdote}>
        <div><input name="anecdote"/></div>
        <button>create</button>
      </form>
    </div>  
  )
}

export default CreateAnecdote