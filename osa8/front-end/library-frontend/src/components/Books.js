import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, BOOKS_BY_GENRE } from '../queries'

const Books = (props) => {
  const books = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState('all genres')
  const [getBooks, result] = useLazyQuery(BOOKS_BY_GENRE)
  const genres = []

  const showBooks = (genre) => {
    setGenre(genre)
    if (genre !== 'all genres') {
      getBooks({ variables: { genre: genre } })
    }
  }

  if (books.loading) {
    return <div>loading...</div>
  }

  books.data.allBooks.forEach(book => {
    book.genres.forEach(genre => {
      if (!genres.includes(genre)) {
        genres.push(genre)
      }
    })
  })

  if (result.loading) {
    console.log('loading...')
    return <div>loading</div>
  }

  if (!props.show) {
    return null
  }

  if (result.data && genre !== 'all genres') {
    return (
      <div>
        <h2>books</h2>
        <p>in genre {genre}</p>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                author
              </th>
              <th>
                published
              </th>
            </tr>
            {result.data.allBooks.map(b => 
              <tr key={b.title}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>  
            )}
          </tbody>
        </table>
        <div>
        {genres.map(g =>
          <button key={g} onClick={() => showBooks(g)}>{g}</button>  
        )}
        <button key='all genres' onClick={() => showBooks('all genres')}>all genres</button>
      </div>
      </div>
    )
  }

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.data.allBooks.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {genres.map(g =>
          <button key={g} onClick={() => showBooks(g)}>{g}</button>  
        )}
        <button key='all genres'>all genres</button>
      </div>
    </div>
  )
}

export default Books