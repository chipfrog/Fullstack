
const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToUpdate = state.find(n => n.id === id)
      const updatedAnecdote = {
        ...anecdoteToUpdate,
        votes: anecdoteToUpdate.votes + 1
      }
      return state.map(anecdote => 
        anecdote.id !== id ? anecdote : updatedAnecdote
      )
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    
    case 'SORT_BY_VOTES':
      return state.sort((a, b) => (a.votes <= b.votes ? 1 : -1))
    
    case 'INIT_NOTES':
      return action.data  
    
    default:
        return state
       
  }
}
export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}
export const newAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: content
  }  
}
export const sortByVotes = () => {
  return {
    type: 'SORT_BY_VOTES'
  }
}
export const initializedAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_NOTES',
    data: anecdotes
  }
}

export default anecdoteReducer