import React from 'react'
import { Link } from 'react-router-dom'

const UserList = ({ users }) => {

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
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UserList