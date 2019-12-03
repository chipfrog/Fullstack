const filterAtStart = null

const initialState = filterAtStart

const filterReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_FILTER':
      return action.filterWord
    
    default:
      return state
  }
}
export const setFilter = (filterWord) => {
  return {
    type: 'SET_FILTER',
    filterWord
  }
}


export default filterReducer