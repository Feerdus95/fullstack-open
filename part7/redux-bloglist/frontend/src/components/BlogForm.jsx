import { useState } from 'react'
import PropTypes from 'prop-types'
import { TextField, Button, Box, Typography } from '@mui/material'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Create new
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          placeholder="write title here"
          margin="normal"
          data-testid="title"
        />
        <TextField
          fullWidth
          label="Author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          placeholder="write author here"
          margin="normal"
          data-testid="author"
        />
        <TextField
          fullWidth
          label="URL"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          placeholder="write url here"
          margin="normal"
          data-testid="url"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          create
        </Button>
      </Box>
    </Box>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm