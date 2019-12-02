import React from 'react'
import { voteAnecdote, sortByVotes } from '../reducers/anecdoteReducer'
import { setNotification, hideNotification } from '../reducers/notificationReducer'

const Anecdotes = (props) => {
  const anecdotes = props.store.getState().anecdotes

  const vote = (id) => {
    props.store.dispatch(voteAnecdote(id))
    props.store.dispatch(sortByVotes())
    props.store.dispatch(setNotification(`You voted '${anecdotes.find(n => n.id === id).content}'`))
    setTimeout(() => 
      props.store.dispatch(setNotification(null)),
      5000)
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
      )}
    </div>
  )
}

export default Anecdotes