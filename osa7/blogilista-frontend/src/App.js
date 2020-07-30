import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import UserList from './components/UserList'

import { BrowserRouter as Router, Switch, Route, Link
} from 'react-router-dom'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import storage from './utils/storage'

import { setNotification } from './reducers/notificationReducer'
import { getBlogs, likeBlog, deleteBlog, makeNewBlog } from './reducers/blogReducer'
import { login, logout } from './reducers/userReducer'
import { getUsers } from './reducers/userListReducer'

const App = () => {
  const dispatch = useDispatch()
  const reduxBlogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.userList)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      dispatch(getBlogs(blogs))
    )
  }, [dispatch])

  useEffect(() => {
    const user = storage.loadUser()
    dispatch(login(user))
  }, [dispatch])

  useEffect(() => {
    userService.getAll().then(allUsers => {
      dispatch(getUsers(allUsers))
    })
  }, [dispatch, reduxBlogs])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      setUsername('')
      setPassword('')
      dispatch(login(user))
      dispatch(setNotification(`${user.name} welcome back!`, 'success'))
      storage.saveUser(user)
    } catch(exception) {
      dispatch(setNotification('wrong username/password', 'error'))
    }
  }

  const createBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog)
      blogFormRef.current.toggleVisibility()
      dispatch(makeNewBlog(newBlog))
      dispatch(setNotification(`a new blog '${newBlog.title}' by ${newBlog.author} added!`, 'success'))
    } catch(exception) {
      console.log(exception)
    }
  }

  const handleLike = async (id) => {
    const blogToLike = reduxBlogs.find(b => b.id === id)
    const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id }
    await blogService.update(likedBlog)
    dispatch(likeBlog(id))
  }

  const handleRemove = async (id) => {
    const blogToRemove = reduxBlogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if (ok) {
      await blogService.remove(id)
      dispatch(deleteBlog(id))
    }
  }

  const handleLogout = () => {
    dispatch(logout())
    storage.logoutUser()
  }

  if ( !user ) {
    return (
      <div>
        <h2>login to application</h2>
        <Notification />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login'>login</button>
        </form>
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  const padding = {
    padding: 5
  }

  const Home = () => {

    return (
      <div>
        <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
          <NewBlog createBlog={createBlog} />
        </Togglable>
        <h2>blogs</h2>
        {reduxBlogs.sort(byLikes).map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={handleLike}
            handleRemove={handleRemove}
            own={user.username===blog.user.username}
          />
        )}
      </div>
    )
  }

  return (

    <div>
      <Router>
        <div>
          <Link style={padding} to="/">home</Link>
          <Link to="/users">users</Link>
        </div>
        <Notification />
        <p>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </p>

        <Switch>
          <Route path="/users">
            <UserList users={users}/>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
