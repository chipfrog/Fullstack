import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote, sortByVotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer' 

const Anecdotes = (props) => {
  
  const vote = (id) => {
    props.voteAnecdote(id)
    props.sortByVotes()
    props.setNotification(`You voted '${props.visibleAnecdotes.find(n => n.id === id).content}'`)
    setTimeout(() => 
      props.setNotification(null),
      5000)
  }

  return (
    <div>
      {props.visibleAnecdotes.map(anecdote =>
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
const anecdotesToShow = ({ anecdotes, filter }) => {
  if ( filter !== null ) {
    return anecdotes.filter(anecdote => 
      anecdote.content.includes(filter))
  }
  return anecdotes
}


const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state)
  }
}
const mapDispatchToProps = {
  voteAnecdote,
  sortByVotes,
  setNotification
}

const ConnectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(Anecdotes)

export default ConnectedAnecdotes