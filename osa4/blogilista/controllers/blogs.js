const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogsRouter.get('/', async (request, response) => {
  logger.info('GET request received')
  const blogs = await Blog.find({})

  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  logger.info('POST request received')

  const blog = new Blog(request.body)

  const result = await blog.save()
  response.status(201).json(result.toJSON())
})

module.exports = blogsRouter