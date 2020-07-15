const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogsRouter.get('/', async (request, response) => {
  logger.info('GET request received')
  const blogs = await Blog.find({})

  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog.toJSON())
})

blogsRouter.post('/', async (request, response, next) => {
  logger.info('POST request received')

  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0
  })

  const result = await blog.save()
  response.status(201).json(result.toJSON())
})

blogsRouter.delete('/:id', async (request, response, next) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(200).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const result = await Blog.findByIdAndUpdate(request.params.id, body, { new: true })
  response.status(200).json(result.toJSON())
})

module.exports = blogsRouter