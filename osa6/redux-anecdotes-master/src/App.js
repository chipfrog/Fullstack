import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import CreateAnecdote from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { initializedAnecdotes } from './reducers/anecdoteReducer'

const App = (props) => {
  useEffect(() => {
    props.initializedAnecdotes()
  }, [])
  
  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <CreateAnecdote />
    </div>
  )
}

export default connect(null, { initializedAnecdotes })(App)