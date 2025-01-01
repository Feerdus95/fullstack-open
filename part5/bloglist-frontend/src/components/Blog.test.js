import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders blog title and author but not url or likes by default', () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 5,
    user: {
      username: 'testuser',
      name: 'Test User'
    }
  }

  const user = {
    username: 'testuser'
  }

  render(<Blog blog={blog} user={user} />)

  // Check that title and author are shown
  expect(screen.getByText(/Test Blog/)).toBeDefined()
  expect(screen.getByText(/Test Author/)).toBeDefined()

  // Check that url and likes are not shown
  const detailDiv = screen.queryByText('http://testurl.com')
  const likesDiv = screen.queryByText('likes 5')
  expect(detailDiv).toBeNull()
  expect(likesDiv).toBeNull()
})

test('url and likes are shown when view button is clicked', async () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 5,
    user: {
      username: 'testuser',
      name: 'Test User'
    }
  }

  const user = {
    username: 'testuser'
  }

  render(<Blog blog={blog} user={user} />)

  const userEventSimulator = userEvent.setup()
  const button = screen.getByText('view')
  await userEventSimulator.click(button)

  // After clicking, these elements should be visible
  expect(screen.getByText('http://testurl.com')).toBeDefined()
  expect(screen.getByText('likes 5')).toBeDefined()
})

test('like button is clicked twice, event handler is called twice', async () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 5,
    user: {
      username: 'testuser',
      name: 'Test User'
    }
  }

  const user = {
    username: 'testuser'
  }

  const mockHandler = jest.fn()

  render(
    <Blog
      blog={blog}
      user={user}
      handleLike={mockHandler}
    />
  )

  const userEventSimulator = userEvent.setup()

  // First, click view to show the like button
  const viewButton = screen.getByText('view')
  await userEventSimulator.click(viewButton)

  // Then click like button twice
  const likeButton = screen.getByText('like')
  await userEventSimulator.click(likeButton)
  await userEventSimulator.click(likeButton)

  // Verify that the event handler was called twice
  expect(mockHandler.mock.calls).toHaveLength(2)
})