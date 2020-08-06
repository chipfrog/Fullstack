import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserList = () => {
  const users = useSelector(state => state.userList)
  const blogs = useSelector(state => state.blogs)

  const getUserBlogs = (id) => {
    const userBlogs = blogs.filter(blog => blog.user.id === id)
    return (
      userBlogs.length
    )
  }

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {users.map(user =>
            <tr key={user.id}>
              <td>
                <li>
                  <Link to={`/users/${user.id}`}>
                    {user.name}
                  </Link>
                </li>
              </td>
              <td>{getUserBlogs(user.id)}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UserList