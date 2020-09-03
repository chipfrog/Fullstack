import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, BOOKS_BY_GENRE } from '../queries'

const Books = (props) => {
  const books = useQuery(ALL_BOOKS)
  const [genreBooks, setBooks] = useState(null)
  // const [genre, setGenre] = useState('all genres')
  const genres = []
  const [getBooks, result] = useLazyQuery(BOOKS_BY_GENRE)

  const showBooks = (genre) => {
    getBooks({ variables: { genre: genre } })
  }

  useEffect(() => {
    if (result.data) {
      console.log('efektissä!')
      setBooks(result.data.allBooks)
    }
  }, [result.data])

  if (books.loading || result.loading) {
    return <div>loading...</div>
  }

  books.data.allBooks.forEach(book => {
    book.genres.forEach(genre => {
      if (!genres.includes(genre)) {
        genres.push(genre)
      }
    })
  })

  if (!props.show) {
    return null
  }

  if (genreBooks) {
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
            {genreBooks.data.allBooks.map(a => 
              <tr key={a.title}>
                <td>{a.genre}</td>

              </tr>  
            )}
          </tbody>
        </table>
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
          {books.data.allBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
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