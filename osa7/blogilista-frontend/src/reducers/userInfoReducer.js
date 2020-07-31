const userInfoReducer = (state = null, action) => {
  switch (action.type) {
  case 'GET_USER':
    return action.data
  default:
    return state
  }
}

export const getUser = (user) => {
  return {
    type: 'GET_USER',
    data: user
  }
}

export default userInfoReducer