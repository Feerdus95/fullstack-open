const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  return blogs.reduce((favorite, blog) => 
    blog.likes > favorite.likes ? blog : favorite
  , blogs[0])
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null
  
    // Group blogs by author
    const blogsByAuthor = _.groupBy(blogs, 'author')
    
    // Convert to array of objects with author and blog count
    const authorBlogCounts = Object.entries(blogsByAuthor).map(([author, blogs]) => ({
      author,
      blogs: blogs.length
    }))
    
    // Find the author with maximum blogs
    return _.maxBy(authorBlogCounts, 'blogs')
  }

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const blogsByAuthor = _.groupBy(blogs, 'author')
  const authorLikes = Object.keys(blogsByAuthor).map(author => ({
    author: author,
    likes: _.sumBy(blogsByAuthor[author], 'likes')
  }))

  return _.maxBy(authorLikes, 'likes')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}