import React from 'react'
import { voteAnecdote, sortByVotes } from '../reducers/anecdoteReducer'

const Anecdotes = (props) => {
  const anecdotes = props.store.getState().anecdotes
  
  const vote = (id) => {
    props.store.dispatch(voteAnecdote(id))
    props.store.dispatch(sortByVotes())
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