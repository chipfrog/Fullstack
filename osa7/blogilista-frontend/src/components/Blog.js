import React from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { useHistory
} from 'react-router-dom'

const Blog = ({ own }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const blogs = useSelector(state => state.blogs)
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)

  if (!blog) {
    return null
  }

  const canBeRemoved = own === blog.user.username

  const handleRemove = async (id) => {
    const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
      await blogService.remove(id)
      history.push('/')
      dispatch(deleteBlog(id))
    }
  }

  const handleLike = async (id) => {
    const blogToLike = blogs.find(b => b.id === id)
    const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id }
    await blogService.update(likedBlog)
    dispatch(likeBlog(id))
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <a target='' href={blog.url}>
        {blog.url}
      </a>
      <div>likes {blog.likes}
        <button onClick={() => handleLike(blog.id)}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      {canBeRemoved&&<button onClick={() => handleRemove(blog.id)}>remove</button>}
    </div>
  )
}

Blog.propTypes = {
  own: PropTypes.string.isRequired
}

export default Blog