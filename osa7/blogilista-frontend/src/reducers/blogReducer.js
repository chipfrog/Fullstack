const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'LIKE_BLOG': {
    const id = action.data.id
    const blogToLike = state.find(blog => blog.id === id)
    const likedBlog = {
      ...blogToLike,
      likes: blogToLike.likes + 1
    }
    return state.map(blog =>
      blog.id !== id ? blog : likedBlog
    )
  }
  case 'DELETE_BLOG': {
    const id = action.data.id
    return state.filter(blog =>
      blog.id !== id
    )
  }
  default:
    return state
  }
}

export const getBlogs = (blogs) => {
  return {
    type: 'INIT_BLOGS',
    data: blogs
  }
}

export const likeBlog = (id) => {
  return {
    type: 'LIKE_BLOG',
    data: { id }
  }
}

export const deleteBlog = (id) => {
  return {
    type: 'DELETE_BLOG',
    data: { id }
  }
}

export default blogReducer