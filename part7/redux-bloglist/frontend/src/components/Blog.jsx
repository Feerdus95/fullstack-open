import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material'
import { ExpandMore, ExpandLess } from '@mui/icons-material'

const Blog = ({ blog, user, handleLike, handleRemove }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleLikeClick = async () => {
    await handleLike(blog)
  }

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        p: isMobile ? 1 : 2,
        '&:hover': {
          boxShadow: 6,
          cursor: 'pointer'
        }
      }}
    >
      <CardContent
        sx={{
          flexGrow: 1,
          pb: 0
        }}
        component={Link}
        to={`/blogs/${blog.id}`}
        style={{
          textDecoration: 'none',
          color: 'inherit'
        }}
      >
        <Box sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          width: '100%'
        }}>
          <Box sx={{
            flexGrow: 1,
            overflow: 'hidden',
            mr: 2
          }}>
            <Typography
              variant={isMobile ? 'h6' : 'h5'}
              component="div"
              gutterBottom
              noWrap
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '100%'
              }}
            >
              {blog.title}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{
                mb: 1.5,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '100%'
              }}
              noWrap
            >
              by {blog.author}
            </Typography>
          </Box>
          <IconButton
            size="small"
            sx={{
              flexShrink: 0,
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)'
              }
            }}
          >
            <ExpandMore />
          </IconButton>
        </Box>
      </CardContent>
      <CardActions>
        <Box sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          gap: 1,
          width: '100%'
        }}>
          <Button
            variant="contained"
            size={isMobile ? 'small' : 'medium'}
            onClick={handleLikeClick}
            sx={{ width: isMobile ? '100%' : 'auto' }}
          >
            Like ({blog.likes})
          </Button>
          {blog.user && user && blog.user.username === user.username && (
            <Button
              variant="outlined"
              color="error"
              size={isMobile ? 'small' : 'medium'}
              onClick={() => handleRemove(blog)}
              sx={{ width: isMobile ? '100%' : 'auto' }}
            >
              Remove
            </Button>
          )}
        </Box>
      </CardActions>
    </Card>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired
}

export default Blog