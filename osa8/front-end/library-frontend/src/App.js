import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Recommended from './components/Recommended'
import { useApolloClient, useLazyQuery, useQuery } from '@apollo/client'
import { ME } from './queries'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [getUser, result] = useLazyQuery(ME)
  const [user, setUser] = useState(null)
  const client = useApolloClient()

  const logout = () => {
    setPage('authors')
    setToken(null)
    setUser(null)
    localStorage.clear()
    client.resetStore()
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const printUser = () => {
    getUser()

    if (result.loading) {
      console.log('loading')
    }

    if (!result.data) {
      console.log('not fetched yet')
    }

    console.log(result.data)
  }



  return (
    <div>
      <Notification errorMessage={errorMessage}/>
      <div>
        <button onClick={() => printUser()}>Me?</button>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token &&
          <button onClick={() => setPage('recommended')}>Recommended</button> 
        }
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

      <Recommended 
        show={page === 'recommended'}
        notify={notify}
      />      

      <LoginForm
          setToken={setToken}
          show={page === 'login'}
          setPage={setPage}
          notify={notify}
          client={client}
      />

    </div>
  )
}

export default App