import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateBlogForm from './components/CreateBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import  { useField } from './hooks'
import './index.css'

const App = () => {
  const username = useField('text')
  const password = useField('password')
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({
    message: null
  })

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
  const notify = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification({ message: null }), 10000)
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
      notify(`${user.username} logged in!`, 'success')
    } catch (exception) {
      console.log(exception)
      notify('wrong username or password!', 'error')
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
        notify(`${blogObject.title} by ${blogObject.author} added!`, 'success')
      } else {
        notify('Title and url are required!', 'error')
      }

    } catch(exception) {
      notify('Error while adding a new blog', 'error')
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
        <h2>Log in to application</h2>

        <Notification notification={notification} />

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
      <div className='blogs'>
        <h2>Blogs</h2>

        <Notification notification= {notification} />

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
