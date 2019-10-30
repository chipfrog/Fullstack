import React from 'react'
import { render , cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders blog information', () => {
  const blog = {
    title: 'Urheilublogi',
    author: 'Teppo Testaaja',
    likes: 5
  }
  const component = render(
    <SimpleBlog blog={blog}/>
  )
  const titlePlusAuthor = component.container.querySelector('.titleAndAuthor')
  expect(titlePlusAuthor).toHaveTextContent('Urheilublogi Teppo Testaaja')

  const likes = component.container.querySelector('.numberOfLikes')
  expect(likes).toHaveTextContent('blog has 5 likes')

})

test('clicking button calls event handler once', async () => {
  const blog = {
    title: 'Urheilublogi',
    author: 'Teppo Testaaja',
    likes: 5
  }
  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )
  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})

