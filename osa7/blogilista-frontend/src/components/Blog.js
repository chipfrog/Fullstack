import React from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Blog = ({ handleLike, handleRemove, own }) => {
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
  handleRemove: PropTypes.func.isRequired,
  own: PropTypes.string.isRequired
}

export default Blog