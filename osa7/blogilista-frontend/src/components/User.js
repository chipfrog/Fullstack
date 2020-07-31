import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const User = () => {
  const users = useSelector(state => state.userList)
  const blogs = useSelector(state => state.blogs)

  const id = useParams().id
  const user = users.find(user => user.id === id)
  const userBlogs = blogs.filter(blog => blog.user.id === id)

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      {userBlogs.map(blog => 
        <li key={blog.id}>{blog.title}</li>
      )}

    </div>
  )
}

export default User