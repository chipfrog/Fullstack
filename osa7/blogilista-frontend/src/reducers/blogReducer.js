import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'GET_ALL':
    return action.data
  case 'LIKE':
    return action.data
  case 'CREATE':
    return action.data
  case 'DELETE':
    return action.data
  default:
    return state
  }
}
export const deleteBlog = (blog) => {
  return async dispatch => {
    await blogService.deleteBlog(blog)
    const data = await blogService.getAll()
    dispatch({
      type: 'DELETE',
      data
    })
  }
}
export const createBlog = (blog) => {
  return async dispatch => {
    await blogService.create(blog)
    const data = await blogService.getAll()
    dispatch({
      type: 'CREATE',
      data
    })
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