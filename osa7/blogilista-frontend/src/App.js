import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateBlogForm from './components/CreateBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import  { useField } from './hooks'
import { setNotification } from './reducers/notificationReducer'
import { setUser, nullUser } from './reducers/userReducer'
import { initialBlogs, likeBlog, createBlog, deleteBlog } from './reducers/blogReducer'
import './index.css'

const App = (props) => {
  const username = useField('text')
  const password = useField('password')
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  useEffect(() => {
    props.initialBlogs()
  },[])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const noReset = (field) => {
    let { reset, ...rest } = field
    return rest
  }
  const notify = (message) => {
    props.setNotification(message, 5)
  }

  const blogFormRef = React.createRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const credentials = {
        username: username.value,
        password: password.value
      }
      const user = await loginService.login(credentials)
      console.log(`Kirjautunut käyttäjä: ${user}`)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      props.setUser(user)
      username.reset()
      password.reset()
      notify(`${user.username} logged in!`)
    } catch (exception) {
      console.log(exception)
      notify('wrong username or password!')
    }
    console.log('logging in with', username.value)
  }
  const handleLogout =  () => {
    window.localStorage.clear()
    props.nullUser()
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
        props.createBlog(blogObject)
        title.reset()
        author.reset()
        url.reset()
        notify(`${blogObject.title} by ${blogObject.author} added!`)
      } else {
        notify('Title and url are required!')
      }
    } catch(exception) {
      notify('Error while adding a new blog')
    }
  }
  const likeBlog = (blog) => {
    props.likeBlog(blog)
    notify(`blog ${blog.title} by ${blog.author} liked!`)
  }
  const removeBlog = async (blog) => {
    const ok = window.confirm(`remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
      props.deleteBlog(blog)
      notify(`blog ${blog.title} by ${blog.author} removed!`)
    }
  }
  if (props.user === null) {
    return (
      <div className='login'>
        <h2>Log in to application</h2>
        <Notification />
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
  const byLikes = (b1, b2) => b2.likes - b1.likes
  return (
    <div className='allBlogs'>
      <div className='blogs'>
        <h2>Blogs</h2>
        <Notification />
        <p>{props.user.name} logged in
          <button type="submit" onClick={handleLogout}>
          logout
          </button>
        </p>
        {props.blogs.sort(byLikes).map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            like={likeBlog}
            remove={removeBlog}
            user={props.getUser}
            creator={blog.user.username === props.user.username}
          />
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
const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user,
  }
}
const mapDispatchToProps = {
  setNotification,
  initialBlogs,
  likeBlog,
  createBlog,
  deleteBlog,
  setUser,
  nullUser
}
const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedApp
