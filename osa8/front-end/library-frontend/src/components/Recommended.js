import React from 'react'
import { useQuery } from '@apollo/client'
import { ME, RECOMMENDED_BOOKS } from '../queries'

const Recommended = ({ show, notify }) => {
  const books = useQuery(RECOMMENDED_BOOKS)
  const currentUser = useQuery(ME)

  if (!show) {
    return null
  }

  if (books.loading || !books.data ||currentUser.loading || !currentUser.data) {
    return <div>loading...</div>
  }

  if (books.data === undefined || !books.data) {
    notify("Genre not found")
    return null
  }

  console.log(currentUser.data.me.favoriteGenre)

  if (books.data && currentUser.data) {
    return (
      <div>
        <h2>Recommendations</h2>
        books in your favourite genre {currentUser.data.me.favoriteGenre}
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
              {books.data.recommended.map(b => 
                <tr key={b.title}>
                  <td>{b.title}</td>
                  <td>{b.author.name}</td>
                  <td>{b.published}</td>
                </tr>  
              )}
            </tbody>
          </table>
      </div>  
    )
  }
}

export default Recommended