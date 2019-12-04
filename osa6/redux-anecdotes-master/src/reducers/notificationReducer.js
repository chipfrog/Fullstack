const notificationAtStart = null

const initialState = notificationAtStart

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      state = action.content
      return state
    case 'REMOVE_NOTIFICATION':
      return null
    default:
      return state  
  }
}
export const setNotification = (content, seconds) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      content
    })
  
  setTimeout(() => dispatch(removeNotification()), 1000 * seconds)  
  }
}
export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}


export default notificationReducer

