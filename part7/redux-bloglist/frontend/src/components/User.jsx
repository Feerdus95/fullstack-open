import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Typography, List, ListItem, ListItemText, Paper, Box } from '@mui/material'

const User = () => {
  const { id } = useParams()
  const user = useSelector(state =>
    state.users.find(user => user.id === id)
  )

  if (!user) {
    return null
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {user.name}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Added blogs:
      </Typography>
      <Paper elevation={2}>
        <List>
          {user.blogs.map(blog => (
            <ListItem key={blog.id}>
              <ListItemText primary={blog.title} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  )
}

export default User