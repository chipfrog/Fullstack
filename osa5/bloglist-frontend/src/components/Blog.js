import React, { useState } from 'react'

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
          <p>{blog.url}</p>
          <p>{blog.likes} likes <button>like</button></p>
          <p>added by {blog.user.name}</p>
        </div>
      </div>
    )
  }
}
  
export default Blog