
const userListReducer = (state = [], action) => {
  switch (action.type) {
  case 'GET_ALL':
    return action.data
  default:
    return state
  }
}

export const getUsers = (users) => {
  return {
    type: 'GET_ALL',
    data: users
  }
}

export default userListReducer