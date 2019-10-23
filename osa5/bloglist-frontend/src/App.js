import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginnService from './services/login'

const App = () => {
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null) 

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => setBlogs(initialBlogs))
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginnService.login({
        username, password,
      })

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    console.log('logging in wiht', username, password)
  }

  if (user === null) {
    return (
      <div>
        { errorMessage }
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username 
              <input 
              type="text" 
              value={username} 
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
              />
          </div>
          <div>
            password
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
      <h2>Blogs</h2>
      {user.name} logged in 
      
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}
  
export default App;
