import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { likeBlog, addComment } from '../reducers/blogReducer'
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material'

const BlogView = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const dispatch = useDispatch()
  const { id } = useParams()
  const blog = useSelector(state =>
    state.blogs.find(blog => blog.id === id)
  )
  const [comment, setComment] = useState('')

  if (!blog) {
    return null
  }

  const handleLike = async () => {
    await dispatch(likeBlog(blog))
  }

  const addCommentHandler = (event) => {
    event.preventDefault()
    dispatch(addComment(blog.id, comment))
    setComment('')
  }

  return (
    <Card sx={{
      minWidth: 275,
      mb: 2,
      p: isMobile ? 1 : 2
    }}>
      <CardContent>
        <Typography
          variant={isMobile ? 'h6' : 'h5'}
          component="h1"
          gutterBottom
        >
          {blog.title} by {blog.author}
        </Typography>
        <Typography
          variant="body1"
          component="a"
          href={blog.url}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: 'block',
            mb: 2,
            color: 'primary.main',
            textDecoration: 'none',
            wordBreak: 'break-word',
            '&:hover': {
              textDecoration: 'underline'
            }
          }}
        >
          {blog.url}
        </Typography>
        <Box sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          gap: 2,
          mb: 2
        }}>
          <Typography variant="body1">
            {blog.likes} likes
          </Typography>
          <Button
            variant="contained"
            size={isMobile ? 'small' : 'medium'}
            onClick={handleLike}
            sx={{ width: isMobile ? '100%' : 'auto' }}
          >
            like
          </Button>
        </Box>
        <Typography variant="body2" sx={{ mb: 2 }}>
          added by {blog.user.name}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Typography variant="h6" gutterBottom>
          Comments
        </Typography>

        <Box
          component="form"
          onSubmit={addCommentHandler}
          sx={{
            mb: 3,
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: 1
          }}
        >
          <TextField
            fullWidth
            value={comment}
            onChange={({ target }) => setComment(target.value)}
            placeholder="write a comment..."
            size={isMobile ? 'small' : 'medium'}
            sx={{ flex: 1 }}
          />
          <Button
            variant="contained"
            type="submit"
            size={isMobile ? 'small' : 'medium'}
            sx={{
              width: isMobile ? '100%' : 'auto',
              minWidth: !isMobile && '120px'
            }}
          >
            add comment
          </Button>
        </Box>

        <Paper
          variant="outlined"
          sx={{
            maxHeight: isMobile ? 200 : 300,
            overflow: 'auto'
          }}
        >
          <List>
            {blog.comments && blog.comments.map((comment, index) => (
              <ListItem
                key={index}
                divider={index !== blog.comments.length - 1}
                sx={{
                  px: isMobile ? 1 : 2,
                  py: isMobile ? 0.5 : 1
                }}
              >
                <ListItemText
                  primary={comment}
                  primaryTypographyProps={{
                    sx: {
                      fontSize: isMobile ? '0.875rem' : '1rem',
                      wordBreak: 'break-word'
                    }
                  }}
                />
              </ListItem>
            ))}
            {(!blog.comments || blog.comments.length === 0) && (
              <ListItem>
                <ListItemText
                  primary="No comments yet"
                  primaryTypographyProps={{
                    sx: {
                      fontSize: isMobile ? '0.875rem' : '1rem',
                      color: 'text.secondary',
                      fontStyle: 'italic'
                    }
                  }}
                />
              </ListItem>
            )}
          </List>
        </Paper>
      </CardContent>
    </Card>
  )
}

export default BlogView