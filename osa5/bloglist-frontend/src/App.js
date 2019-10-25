import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateBlogForm from './components/CreateBlog'
import Togglable from './components/Togglable'
import './index.css'


const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => setBlogs(initialBlogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = React.createRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage(`${user.username} logged in!`)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } catch (exception) {
      setErrorMessage('wrong username or password!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
    console.log('logging in with', username)
  }
  const handleLogout =  () => {
    window.localStorage.clear()
    setUser(null)
    window.location.reload()

  }
  const addBlog = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    try {
      const blogObject = {
        title: title,
        author: author,
        url: url,
      }
      blogService.create(blogObject)
      setTitle('')
      setAuthor('')
      setUrl('')
      setMessage(`${blogObject.title} by ${blogObject.author} added!`)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } catch(exception) {
      setErrorMessage('Error while adding a new blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)

    }
  }
/* eslint-disable */ 
  const requiredFieldsCheck = () => {
    if (title === undefined ||url === undefined) {
      const message = 'Title and url are required!'
      setErrorMessage(message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)

      return false

    } else {
      return true
    }
  }
  /* eslint-enable */

  const sortBlogsByLikes = () => {
    const sortedBlogs = blogs
    sortedBlogs.sort((a,b) => (a.likes > b.likes) ? -1 : 1)
    return sortedBlogs
  }

  if (user === null) {
    return (
      <div>
        {errorMessage !== null &&
        <div className="error">
          { errorMessage }
        </div>
        }
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            Username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            Password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      {message !== null &&
      <div className="message">
        {message}
      </div>
      }
      <h2>Blogs</h2>
      <p>{user.name} logged in
        <button type="submit" onClick={handleLogout}>
          logout
        </button>
      </p>
      {sortBlogsByLikes().map(blog =>
        <Blog key={blog.id} blog={blog} user={user}/>
      )}
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <CreateBlogForm
          addBlog={addBlog}
          setTitle={setTitle}
          setAuthor={setAuthor}
          setUrl={setUrl}
          title={title}
          author={author}
          url={url}
        />
      </Togglable>
    </div>
  )
}

export default App
