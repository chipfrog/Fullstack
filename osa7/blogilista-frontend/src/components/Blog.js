import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import { likeBlog, deleteBlog, commentBlog } from '../reducers/blogReducer'
import { useHistory } from 'react-router-dom'


const Blog = ({ own }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const blogs = useSelector(state => state.blogs)
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)

  const [comment, setComment] = useState('')

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

  const handleComment = async (event) => {
    event.preventDefault()
    try {
      await blogService.comment(blog.id, comment)
      dispatch(commentBlog(blog.id, comment))
      setComment('')
    } catch(exception) {
      console.log(exception)
    }
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.url}</p>
      <div>likes {blog.likes}
        <button onClick={() => handleLike(blog.id)}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      {canBeRemoved&&<button onClick={() => handleRemove(blog.id)}>remove</button>}
      <h3>comments</h3>

      <form onSubmit={handleComment}>
        <div>
          <input
            id='comment'
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <button id='sendComment'>add comment</button>
      </form>

      <div>
        {blog.comments.map(comment =>
          <li key={comment}>{comment}</li>
        )}
      </div>
    </div>
  )
}

Blog.propTypes = {
  own: PropTypes.string.isRequired
}

export default Blog