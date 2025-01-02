import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, handleLike, handleRemove }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)
  const [blogData, setBlogData] = useState(blog)

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
    const updatedBlog = await handleLike(blogData)
    if (updatedBlog) {
      setBlogData(updatedBlog)
    }
  }

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blogData.title} {blogData.author}
        <button onClick={toggleDetails}>
          {detailsVisible ? 'hide' : 'view'}
        </button>
      </div>
      {detailsVisible && (
        <div className="blog-details">
          <div>{blogData.url}</div>
          <div>
            likes <span data-testid="likes-count">{blogData.likes}</span>
            <button onClick={handleLikeClick}>like</button>
          </div>
          <div>{blogData.user ? blogData.user.name : ''}</div>
          {blogData.user && user && blogData.user.username === user.username && (
            <button onClick={() => handleRemove(blogData)}>remove</button>
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