import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Users from './components/Users'
import Togglable from './components/Togglable'
import { notify } from './reducers/notificationReducer'
import { loginUser, logoutUser, initializeUser } from './reducers/userReducer'
import { initializeBlogs, createBlog, likeBlog, deleteBlog } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import User from './components/User'
import BlogView from './components/BlogView'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    if (user) {
      dispatch(initializeBlogs())
      dispatch(initializeUsers())
    }
  }, [dispatch, user])

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

  const Menu = () => {
    const padding = {
      paddingRight: 5
    }

    const navStyle = {
      backgroundColor: 'lightgrey',
      padding: 5,
      marginBottom: 10,
      display: 'flex',
      alignItems: 'center'
    }

    return (
      <div style={navStyle}>
        <div>
          <Link style={padding} to="/">blogs</Link>
          <Link style={padding} to="/users">users</Link>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          {user.name} logged in
          <button style={{ marginLeft: 5 }} onClick={handleLogout}>
            logout
          </button>
        </div>
      </div>
    )
  }

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await dispatch(createBlog(blogObject))
      showNotification(`New blog ${returnedBlog.title} by ${returnedBlog.author} added`)
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

  const handleLike = async (blog) => {
    try {
      await dispatch(likeBlog(blog))
      return true
    } catch (exception) {
      showNotification('Error liking blog', 'error')
      return false
    }
  }

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await dispatch(deleteBlog(blog.id))
        showNotification(`Blog ${blog.title} by ${blog.author} removed`)
      } catch (exception) {
        showNotification('Error removing blog', 'error')
      }
    }
  }

  return (
    <Router>
      <div>
        <h2>blogs</h2>
        <Notification />
        <Menu />

        <Routes>
          <Route path="/users/:id" element={<User />} />
          <Route path="/users" element={<Users />} />
          <Route path="/blogs/:id" element={<BlogView />} />
          <Route path="/" element={
            <div>
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
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App