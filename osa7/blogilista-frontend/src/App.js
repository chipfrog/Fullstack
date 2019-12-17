import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateBlogForm from './components/CreateBlog'
import Togglable from './components/Togglable'
import  { useField } from './hooks'
import './index.css'


const App = () => {
  const username = useField('text')
  const password = useField('password')
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

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

  const noReset = (field) => {
    let { reset, ...rest } = field
    return rest
  }

  const blogFormRef = React.createRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const credentials = {
        username: username.value,
        password: password.value
      }
      console.log(credentials)
      const user = await loginService.login(credentials)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()
      setMessage(`${user.username} logged in!`)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } catch (exception) {
      console.log(exception)
      setErrorMessage('wrong username or password!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
    console.log('logging in with', username.value)
  }
  const handleLogout =  () => {
    window.localStorage.clear()
    setUser(null)
    window.location.reload()

  }
  const requiredFieldsOk = () => {
    if (title.value === ''|| url.value === '') {
      console.log('no title or url')
      return false
    } else {
      console.log('everything ok')
      return true
    }
  }
  const addBlog = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    try {
      const blogObject = {
        title: title.value,
        author: author.value,
        url: url.value,
      }
      if (requiredFieldsOk(blogObject.title, blogObject.url)) {
        await blogService.create(blogObject)
        title.reset()
        author.reset()
        url.reset()
        const updatedBlogs = await blogService.getAll()
        setBlogs(updatedBlogs)
        setMessage(`${blogObject.title} by ${blogObject.author} added!`)
        console.log(title)
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      } else {
        setErrorMessage('Title and url are required!')
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)}

    } catch(exception) {
      setErrorMessage('Error while adding a new blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)

    }
  }

  const sortBlogsByLikes = () => {
    const sortedBlogs = blogs
    sortedBlogs.sort((a,b) => (a.likes > b.likes) ? -1 : 1)
    return sortedBlogs
  }

  if (user === null) {
    return (
      <div className='login'>
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
              {...noReset(username)}
            />
          </div>
          <div>
            Password
            <input
              {...noReset(password)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }
  return (
    <div className='allBlogs'>
      {message !== null &&
      <div className="message">
        {message}
      </div>
      }
      {errorMessage !== null &&
      <div className="error">
        {errorMessage}
      </div>
      }
      <div className='blogs'>
        <h2>Blogs</h2>
        <p>{user.name} logged in
          <button type="submit" onClick={handleLogout}>
          logout
          </button>
        </p>
        {sortBlogsByLikes().map(blog =>
          <Blog key={blog.id} blog={blog} user={user}/>
        )}
      </div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <CreateBlogForm
          addBlog={addBlog}
          title={title}
          author={author}
          url={url}
        />
      </Togglable>
    </div>
  )
}

export default App
