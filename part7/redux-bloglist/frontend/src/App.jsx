import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import Togglable from './components/Togglable'
import { notify } from './reducers/notificationReducer'
import { loginUser, logoutUser, initializeUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  const showNotification = (message, type = 'success') => {
    dispatch(notify(message, type))
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      await dispatch(loginUser({ username, password }))
      setUsername('')
      setPassword('')
      const currentUser = user || JSON.parse(window.localStorage.getItem('loggedBlogappUser'))
      showNotification(`${currentUser.name} has logged in successfully!`)
    } catch (exception) {
      showNotification('Wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    dispatch(logoutUser())
    showNotification('Logged out successfully')
  }

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      showNotification(`A new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
    } catch (exception) {
      showNotification('Error creating blog', 'error')
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              data-testid="username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              data-testid="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  const updateBlog = async (id, blogObject) => {
    try {
      const updatedBlog = await blogService.update(id, blogObject)
      setBlogs(blogs.map(blog => blog.id === id ? updatedBlog : blog))
    } catch (exception) {
      showNotification('Error updating blog', 'error')
    }
  }

  const handleLike = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    }

    try {
      const returnedBlog = await blogService.update(blog.id, updatedBlog)
      setBlogs(blogs.map(b => b.id === blog.id ? returnedBlog : b))
      return returnedBlog
    } catch (exception) {
      showNotification('Error updating likes', 'error')
      return null
    }
  }

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
        showNotification(`Blog ${blog.title} was successfully deleted`)
      } catch (exception) {
        showNotification('Error removing blog', 'error')
      }
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>

      <Togglable buttonLabel="create new blog">
        <BlogForm createBlog={addBlog} />
      </Togglable>

      {sortedBlogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          handleLike={() => handleLike(blog)}
          handleRemove={() => handleRemove(blog)}
        />
      )}
    </div>
  )
}

export default App