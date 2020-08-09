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
import { getBlogs, makeNewBlog } from './reducers/blogReducer'
import { login, logout } from './reducers/userReducer'
import { getUsers } from './reducers/userListReducer'
import User from './components/User'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Navbar } from 'react-bootstrap'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const loggedInUser = useSelector(state => state.user)
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
  }, [dispatch])

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

  const handleLogout = () => {
    dispatch(logout())
    storage.logoutUser()
  }

  if ( !loggedInUser ) {
    return (
      <div className="row justify-content-md-center">
        <div>
          <h2>login to application</h2>
          <Notification />
          <Form onSubmit={handleLogin}>
            <Form.Group as={Row} controlId='formUsername'>
              <Col sm='3'>
                <Form.Label>username</Form.Label>
              </Col>
              <Col sm='9'>
                <Form.Control type='text'
                  value={username}
                  onChange={({ target }) => setUsername(target.value)}/>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId='formPassword'>
              <Col sm='3'>
                <Form.Label>password</Form.Label>
              </Col>
              <Col sm='9'>
                <Form.Control type='password'
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}/>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId='formButton'>
              <Col sm='3'>
                <Button type='submit' id='login'>login</Button>
              </Col>
            </Form.Group>
          </Form>
        </div>
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  const padding = {
    padding: 5
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const Home = () => {
    return (
      <div className="container">
        <h2>blogs</h2>
        <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
          <NewBlog createBlog={createBlog} />
        </Togglable>
        {blogs.sort(byLikes).map(blog =>
          <Link key ={blog.id} to={`/blogs/${blog.id}`}>
            <div style={blogStyle}>
              {blog.title} by {blog.author}
            </div>
          </Link>
        )}
      </div>
    )
  }

  return (
    <div className="container">
      <Router>
        <Navbar bg='light'>
          <Link style={padding} to="/">blogs</Link>
          <Link style={padding} to="/users">users</Link>
          {loggedInUser.name} logged in <Button onClick={handleLogout}>logout</Button>
        </Navbar>
        <Notification />

        <Switch>
          <Route path="/blogs/:id">
            <Blog own={loggedInUser.username}/>
          </Route>
          <Route path="/blogs">
            <Home />
          </Route>
          <Route path="/users/:id">
            <User />
          </Route>
          <Route path="/users">
            <UserList />
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
