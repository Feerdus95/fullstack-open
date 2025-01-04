import { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({ blog, user, handleLike, handleRemove }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible)
  }

  const handleLikeClick = async () => {
    await handleLike(blog)
  }

  return (
    <div style={blogStyle} className="blog">
      <div>
        <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
        <button onClick={toggleDetails}>
          {detailsVisible ? 'hide' : 'view'}
        </button>
      </div>
      {detailsVisible && (
        <div className="blog-details">
          <div>{blog.url}</div>
          <div>
            likes <span data-testid="likes-count">{blog.likes}</span>
            <button onClick={handleLikeClick}>like</button>
          </div>
          <div>{blog.user ? blog.user.name : ''}</div>
          {blog.user && user && blog.user.username === user.username && (
            <button onClick={() => handleRemove(blog)}>remove</button>
          )}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired
}

export default Blog