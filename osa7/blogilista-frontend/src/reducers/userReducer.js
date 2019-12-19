const userAtStart = window.localStorage.getItem('loggedUser')
const initialState = userAtStart

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.user
  case 'NULL_USER':
    return action.data
  default:
    return state
  }
}
export const setUser = (user) => {
  return async dispatch => {
    await dispatch({
      type: 'SET_USER',
      user
    })
  }
}
export const nullUser = () => {
  return async dispatch => {
    await dispatch({
      type: 'NULL_USER',
      data: null
    })
  }
}

export default userReducer


