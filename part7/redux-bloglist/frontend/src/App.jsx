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
import {
  Container,
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  IconButton,
  TextField,
  useTheme,
  useMediaQuery,
  Grid,
  ThemeProvider,
  createTheme
} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'

const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#1976d2',
        light: '#42a5f5',
        dark: '#1565c0',
      },
      secondary: {
        main: '#9c27b0',
      },
      background: {
        default: '#f5f5f5',
      }
    },
    typography: {
      h5: {
        fontWeight: 500,
      },
      h6: {
        fontWeight: 500,
      }
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          },
        },
      },
    },
  })

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
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
    return (
      <AppBar position="static">
        <Toolbar sx={{
          flexDirection: isMobile ? 'column' : 'row',
          py: isMobile ? 1 : 0,
          gap: isMobile ? 1 : 0
        }}>
          <Box sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            width: isMobile ? '100%' : 'auto',
            gap: isMobile ? 1 : 2
          }}>
            <Button
              color="inherit"
              component={Link}
              to="/"
              fullWidth={isMobile}
              sx={{
                borderRadius: isMobile ? 1 : 'default',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              Blogs
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/users"
              fullWidth={isMobile}
              sx={{
                borderRadius: isMobile ? 1 : 'default',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              Users
            </Button>
          </Box>

          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            mt: isMobile ? 1 : 0,
            ml: isMobile ? 0 : 'auto',
            width: isMobile ? '100%' : 'auto',
            justifyContent: isMobile ? 'space-between' : 'flex-end'
          }}>
            <Typography
              variant="subtitle1"
              sx={{
                mr: 2,
                textAlign: isMobile ? 'center' : 'right'
              }}
            >
              {user.name} logged in
            </Typography>
            <IconButton
              color="inherit"
              onClick={handleLogout}
              size={isMobile ? 'medium' : 'small'}
              aria-label="logout"
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              <LogoutIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
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
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          <Box sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <Typography component="h1" variant="h5">
              Log in to application
            </Typography>
            <Notification />
            <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={({ target }) => setUsername(target.value)}
                data-testid="username"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                data-testid="password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
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
    <ThemeProvider theme={theme}>
      <Router>
        <Box sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          minHeight: '100vh'
        }}>
          <Menu />
          <Container
            maxWidth={isMobile ? 'sm' : 'lg'}
            sx={{
              mt: isMobile ? 2 : 4,
              mb: isMobile ? 2 : 4,
              px: isMobile ? 2 : 3
            }}
          >
            <Notification />

            <Routes>
              <Route path="/users/:id" element={<User />} />
              <Route path="/users" element={<Users />} />
              <Route path="/blogs/:id" element={<BlogView />} />
              <Route path="/" element={
                <Box>
                  <Togglable buttonLabel="create new blog">
                    <BlogForm createBlog={addBlog} />
                  </Togglable>

                  <Grid container spacing={isMobile ? 4 : 5}>
                    {sortedBlogs.map(blog =>
                      <Grid item xs={12} md={6} lg={4} key={blog.id}>
                        <Blog
                          key={blog.id}
                          blog={blog}
                          user={user}
                          handleLike={() => handleLike(blog)}
                          handleRemove={() => handleRemove(blog)}
                        />
                      </Grid>
                    )}
                  </Grid>
                </Box>
              } />
            </Routes>
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  )
}

export default App