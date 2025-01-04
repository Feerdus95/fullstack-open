/* eslint-disable no-useless-catch */
import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { initializeUsers } from './usersReducer'
import { notify } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      return state.map(blog =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      )
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter(blog => blog.id !== id)
    },
    commentBlog(state, action) {
      const { id, comment } = action.payload
      const blog = state.find(b => b.id === id)
      if (blog) {
        blog.comments = blog.comments.concat(comment)
      }
    }
  }
})

export const { setBlogs, appendBlog, updateBlog, removeBlog, commentBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    try {
      const blogs = await blogService.getAll()
      dispatch(setBlogs(blogs))
    } catch (error) {
      console.error('Error fetching blogs:', error)
    }
  }
}

export const createBlog = (blogObject) => {
  return async dispatch => {
    const newBlog = await blogService.create(blogObject)
    dispatch(appendBlog(newBlog))
    dispatch(initializeUsers())
    return newBlog
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    try {
      const updatedBlog = {
        ...blog,
        likes: blog.likes + 1,
        user: blog.user.id
      }
      const returnedBlog = await blogService.update(blog.id, updatedBlog)
      const blogToUpdate = {
        ...returnedBlog,
        user: blog.user
      }
      dispatch(updateBlog(blogToUpdate))
      return blogToUpdate
    } catch (error) {
      throw error
    }
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    try {
      await blogService.remove(id)
      dispatch(removeBlog(id))
      dispatch(initializeUsers())
    } catch (error) {
      throw error
    }
  }
}

export const addComment = (id, comment) => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService.createComment(id, comment)
      dispatch(updateBlog(updatedBlog))
      dispatch(notify('Comment added successfully', 'success'))
      return updatedBlog
    } catch (error) {
      dispatch(notify('Error adding comment', 'error'))
      throw error
    }
  }
}

export default blogSlice.reducer