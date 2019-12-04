import anecdoteService from '../services/anecdotes'

const sortAnecdotes = (anecdotes) => {
  return anecdotes.sort((a, b) => (a.votes <= b.votes ? 1 : -1))
}  

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToUpdate = state.find(n => n.id === id)
      const updatedAnecdote = {
        ...anecdoteToUpdate,
        votes: anecdoteToUpdate.votes + 1
      }
      const updatedAnecdotes = state.map(anecdote => 
        anecdote.id !== id ? anecdote : updatedAnecdote)

      return sortAnecdotes(updatedAnecdotes)
      
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    
    case 'INIT_ANECDOTES':
      return sortAnecdotes(action.data)
    
    default:
        return state
       
  }
}
export const voteAnecdote = anecdote => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.giveVote(anecdote)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}
export const newAnecdote = content => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: anecdote,
    })
  } 
}
export const initializedAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export default anecdoteReducer