import React from 'react';
import CreateAnecdote from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'

const App = (props) => {
  return (
    <div>
      <Notification store={props.store} />
      <h2>Anecdotes</h2>
      <AnecdoteList store={props.store} />
      <CreateAnecdote store={props.store} />
    </div>
  )
}

export default App