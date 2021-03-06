import React from 'react'
import { connect } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const CreateAnecdote = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.newAnecdote(content)

    props.setNotification('You created a new note!', 5)
    
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote"/></div>
        <button>create</button>
      </form>
    </div>  
  )
}

const mapDispatchToProps = {
  newAnecdote,
  setNotification
}

const ConnectedCreateAnecdote = connect(null, mapDispatchToProps)(CreateAnecdote)

export default ConnectedCreateAnecdote