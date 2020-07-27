const initialNotification = null
const initialState = initialNotification

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.data
  case 'REMOVE_NOTIFICATION':
    return null
  default:
    return state
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}

export const setNotification = (content, notificationType) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { message: content, type: notificationType }
    })

    setTimeout(() => dispatch(removeNotification()), 5000)
  }
}

export default notificationReducer
