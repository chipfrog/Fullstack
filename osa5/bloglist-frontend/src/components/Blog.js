import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
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
      </div>
    )
  }
}
  
export default Blog