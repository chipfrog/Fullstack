import React from 'react'
import { connect } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const CreateAnecdote = (props) => {
  const AddAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.newAnecdote(content)
    props.setNotification('You created a new note!')
    setTimeout(() => 
      props.setNotification(null),
      5000)
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
const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    notification: state.notification
  }
}
const mapDispatchToProps = {
  newAnecdote,
  setNotification
}

const ConnectedCreateAnecdote = connect(mapStateToProps, mapDispatchToProps)(CreateAnecdote)

export default ConnectedCreateAnecdote