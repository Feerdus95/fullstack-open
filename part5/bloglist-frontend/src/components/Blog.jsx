import { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

const Blog = ({ blog, user }) => {
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

  const handleLike = async () => {
    const updatedBlog = {
      ...blogData,
      likes: blogData.likes + 1
    }

    try {
      const returnedBlog = await blogService.update(blog.id, updatedBlog)
      setBlogData(returnedBlog)
    } catch (exception) {
      console.error('Error updating likes')
    }
  }

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blogData.title} by ${blogData.author}?`)) {
      try {
        await blogService.remove(blog.id)
      } catch (exception) {
        console.error('Error removing blog')
      }
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        {blogData.title} {blogData.author}
        <button onClick={toggleDetails}>
          {detailsVisible ? 'hide' : 'view'}
        </button>
      </div>
      {detailsVisible && (
        <div>
          <div>{blogData.url}</div>
          <div>likes {blogData.likes} <button onClick={handleLike}>like</button></div>
          <div>{blogData.user ? blogData.user.name : ''}</div>
          {blogData.user && user && blogData.user.username === user.username && (
            <button onClick={handleRemove}>remove</button>
          )}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog