import React from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import { getBlogs, likeBlog, deleteBlog, makeNewBlog } from '../reducers/blogReducer'
import { BrowserRouter as Router, Switch, Route, Link, useHistory
} from 'react-router-dom'

const Blog = ({ handleLike, own }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const blogs = useSelector(state => state.blogs)
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)

  const canBeRemoved = own === blog.user.username

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleRemove = async (id) => {
    const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
      await blogService.remove(id)
      history.push('/')
      dispatch(deleteBlog(id))
    }
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        <div>{blog.url}</div>
        <div>likes {blog.likes}
          <button onClick={() => handleLike(blog.id)}>like</button>
        </div>
        <div>{blog.user.name}</div>
        {canBeRemoved&&<button onClick={() => handleRemove(blog.id)}>remove</button>}
      </div>
    </div>
  )
}

Blog.propTypes = {
  handleLike: PropTypes.func.isRequired,
  own: PropTypes.string.isRequired
}

export default Blog