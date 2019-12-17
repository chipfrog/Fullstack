import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('at first only title and author are visible', () => {
  const blog = {
    title: 'testBlog',
    author: 'tester',
    url: 'www.google.com',
    likes: 10
  }
  const component = render(
    <Blog blog={blog} />
  )
  expect(component.container).toHaveTextContent(
    'testBlog tester'
  )
  expect(component.container).not.toHaveTextContent(
    'likes'
  )
})

test('blog information becomes visible after clicking', () => {
  const user = {
    name: 'Teppo',
    username: 'TestMan'
  }
  const blog = {
    title: 'testBlog',
    author: 'tester',
    url: 'www.google.com',
    likes: 10,
    user: user
  }
  const component = render(
    <Blog blog={blog} user={user} />
  )
  expect(component.container).not.toHaveTextContent(
    '10 likes'
  )
  const button = component.getByText('testBlog tester')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    '10 likes'
  )
  expect(component.container).toHaveTextContent(
    'www.google.com'
  )
})