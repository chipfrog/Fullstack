import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user }) => {
  const [visibleInfo, setVisibleInfo] = useState(false)
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    if (visibleInfo === false) {
      setVisibleInfo(true)
      
    } else if (visibleInfo === true) {
      setVisibleInfo(false)
    }
  }
  const addLike = () => {
    blog.likes += 1
    blogService.update(blog)
  }
  const deleteBlog = () => {
    blogService.setToken(user.token)
    blogService.deleteBlog(blog)
  }

  if (visibleInfo === false) {
    return (
      <div style={blogStyle}>
        <div onClick={() => toggleVisibility()}>
        {blog.title} {blog.author}
        </div>
      </div>
  )
  } else {
    return (
      <div style={blogStyle}>
        <div onClick={() => toggleVisibility()}>
          <p>{blog.title} {blog.author}</p>
        </div>
        <div>  
          <p>{blog.url}</p>
          <p>{blog.likes} likes <button onClick={addLike}>like</button></p>
          <p>added by {blog.user.name}</p>
        </div>
        {user.username === blog.user.username &&
        <div>
          <button onClick={deleteBlog}>remove</button>
        </div>
        }
      </div>
    )
  }
}
  
export default Blog