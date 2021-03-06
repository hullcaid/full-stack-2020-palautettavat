const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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

const usersInDB = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const addAUser = async () => {
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', name: 'root', passwordHash })
  const createdUser = await user.save()
  return createdUser
}

const getToken = async (username) => {
  const user = await User.findOne({ username: username })

  const userForToken = {
    username: username,
    id: user._id,
  }

  return jwt.sign(userForToken, process.env.SECRET)
}

module.exports = {
  initialBlogs, blogsInDB, usersInDB, addAUser, getToken
}