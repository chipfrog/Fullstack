import blogService from '../services/blogs'


const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'GET_ALL':
    return action.data

  default:
    return state
  }
}

export const initialBlogs = () => {
  return async (dispatch) => {
    const data = await blogService.getAll()
    dispatch({
      type: 'GET_ALL',
      data
    })
  }
}

export default blogReducer