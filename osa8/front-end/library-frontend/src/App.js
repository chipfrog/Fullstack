import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { useApolloClient } from '@apollo/client'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  return (
    <div>
      <Notification errorMessage={errorMessage}/>

      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token &&
          <button onClick={() => setPage('add book')}>add book</button>
        }
        {!token
          ? <button onClick={() => setPage('login')}>login</button>
          : <button onClick={() => logout()}>logout</button>
        }
      </div>

      <Authors
        show={page === 'authors'}
        notify={notify}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add book'}
        notify={notify}
      />
      

      <LoginForm
          setToken={setToken}
          show={page === 'login'}
          setPage={setPage}
          notify={notify}
      />

    </div>
  )
}

export default App