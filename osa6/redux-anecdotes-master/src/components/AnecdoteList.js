import React from 'react'
import { voteAnecdote, sortByVotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer' 

const Anecdotes = (props) => {
  const { anecdotes, filter } = props.store.getState()
  console.log(anecdotes)
  console.log(filter)
  const anecdotesToShow = () => {
    if ( filter !== null ) {
      return anecdotes.filter(anecdote => 
        anecdote.content.includes(filter))
    }
    return anecdotes
  }

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
      {anecdotesToShow().map(anecdote =>
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