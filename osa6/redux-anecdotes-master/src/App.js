import React from 'react';
import CreateAnecdote from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = (props) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList store={props.store} />
      <CreateAnecdote store={props.store} />
    </div>
  )
}

export default App