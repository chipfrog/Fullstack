const notificationAtStart = null

const initialState = notificationAtStart

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'NOTIFICATION':
      state = action.content
      return state
    
    default:
      return state  
  }
}
export const setNotification = (content) => {
  return {
    type: 'NOTIFICATION',
    content
  }
}

export default notificationReducer

