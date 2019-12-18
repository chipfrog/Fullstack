import blogService from '../services/blogs'


const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'GET_ALL':
    return action.data
  case 'LIKE':
    return action.data

  default:
    return state
  }
}
export const likeBlog = (blog) => {
  return async (dispatch) => {
    const liked = { ...blog, likes: blog.likes + 1 }
    await blogService.update(liked)
    const data = await blogService.getAll()
    dispatch({
      type: 'LIKE',
      data
    })
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