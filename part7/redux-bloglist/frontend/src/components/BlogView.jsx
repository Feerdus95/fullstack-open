import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { likeBlog, deleteBlog, addComment } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'

const BlogView = () => {
  const id = useParams().id
  const blog = useSelector(state => state.blogs.find(b => b.id === id))
  const user = useSelector(state => state.user)
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (!blog) {
    return null
  }

  const handleLike = async () => {
    try {
      await dispatch(likeBlog(blog))
    } catch (exception) {
      dispatch(notify('Error liking blog', 'error'))
    }
  }

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await dispatch(deleteBlog(blog.id))
        dispatch(notify(`Blog ${blog.title} by author ${blog.author} was successfully deleted`))
        navigate('/')
      } catch (exception) {
        dispatch(notify('Error removing blog', 'error'))
      }
    }
  }

  const handleComment = async (event) => {
    event.preventDefault()
    try {
      await dispatch(addComment(blog.id, comment))
      setComment('')
    } catch (exception) {
      dispatch(notify('Error adding comment', 'error'))
    }
  }

  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes <button onClick={handleLike}>like</button>
      </div>
      <div>
        added by {blog.user.name}
      </div>
      {blog.user.username === user.username && (
        <button onClick={handleRemove}>remove</button>
      )}

      <h3>comments</h3>
      <form onSubmit={handleComment}>
        <div>
          <input
            value={comment}
            onChange={({ target }) => setComment(target.value)}
            placeholder="add a comment here"
          />
          <button type="submit">add comment</button>
        </div>
      </form>

      {blog.comments && blog.comments.length > 0 ? (
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      ) : (
        <p>no comments yet</p>
      )}
    </div>
  )
}

export default BlogView