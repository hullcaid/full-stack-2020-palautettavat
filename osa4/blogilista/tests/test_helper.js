const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Title0',
    author: 'Name0',
    url: 'http://url0.html',
    likes: 1
  },
  {
    title: 'Title1',
    author: 'Name1',
    url: 'http://url1.html',
    likes: 3
  },
  {
    title: 'Title2',
    author: 'Name2',
    url: 'http://url2.html',
    likes: 5
  }
]

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDB
}