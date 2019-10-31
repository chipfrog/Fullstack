import React from 'react'
import { render,  waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'
import blogs from './services/blogs'

describe('<App />', () => {
  test('blogs are not rendered if user is not logged in', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )
    expect(component.container).toBeDefined()
    expect(component.container).toHaveTextContent(
      'Log in to application'
    )
    expect(component.container).not.toHaveTextContent(
      'Blogs'
    )
})

  test('blogs are rendered when user is logged in', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Teppo Testaaja'
    }

    localStorage.setItem('loggedUser', JSON.stringify(user))
    blogs.setToken()
    const component = render(<App />)
    component.rerender(<App />)

    await waitForElement(
      () => component.container.querySelector('.allBlogs')
    )

    expect(component.container).toBeDefined()
    expect(component.container).toHaveTextContent(
      'Blogs'
    )
    expect(component.container).toHaveTextContent(
      'TestiBlogi'
    )

  })
})