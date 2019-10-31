import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user }) => {
  const [visibleInfo, setVisibleInfo] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

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
  const addLike = async () => {
    let updatedLikes = await likes + 1
    setLikes(updatedLikes)
    blog.likes = updatedLikes
    blogService.update(blog)
  }
  const deleteBlog = () => {
    const result = window.confirm('Are you sure you want to delete this blog?')
    if (result === true) {
      blogService.setToken(user.token)
      blogService.deleteBlog(blog)
      window.location.reload()
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
        </div>
        <div>
          <p>{blog.url}</p>
          <p>{likes} likes <button onClick={addLike}>like</button></p>
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