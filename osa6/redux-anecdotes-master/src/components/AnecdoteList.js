import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote, sortByVotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer' 

const Anecdotes = (props) => {
  const anecdotesToShow = () => {
    if ( props.filter !== null ) {
      return props.anecdotes.filter(anecdote => 
        anecdote.content.includes(props.filter))
    }
    return props.anecdotes
  }

  const vote = (id) => {
    props.voteAnecdote(id)
    props.sortByVotes()
    props.setNotification(`You voted '${props.anecdotes.find(n => n.id === id).content}'`)
    setTimeout(() => 
      props.setNotification(null),
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
const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
    notification: state.notification
  }
}
const mapDispatchToProps = {
  voteAnecdote,
  sortByVotes,
  setNotification
}

const ConnectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(Anecdotes)

export default ConnectedAnecdotes