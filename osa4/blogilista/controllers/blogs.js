const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const logger = require('../utils/logger')

const findUser = async (request, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return null
  }
  const user = await User.findById(decodedToken.id)
  return user
}

blogsRouter.get('/', async (request, response) => {
  logger.info('GET request received')
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog.toJSON())
})

blogsRouter.post('/', async (request, response, next) => {
  logger.info('POST request received')
  const body = request.body

  const user = await findUser(request)

  if(!user) {
    //tämän voisi laittaa findUser-metodiin (jaettua koodia)
    logger.error('token missing or invalid')
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    user: user._id,
    likes: body.likes ? body.likes : 0
  })

  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()

  response.status(201).json(result.toJSON())
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const user = await findUser(request)
  if(!user) {
    //tämän voisi laittaa findUser-metodiin (jaettua koodia)
    logger.error('token missing or invalid')
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blogToDelete = await Blog.findById(request.params.id)
  if (!blogToDelete) {
    logger.error('Resource to delete not found')
    return response.status(404).json({ error: 'NOT FOUND' })
  }

  if (blogToDelete.user.toString() !== user.id.toString()) {
    logger.error('User does not own the resource')
    return response.status(401).json({ error: 'Access denied' })
  }

  await Blog.findByIdAndDelete(request.params.id)

  user.blogs = user.blogs.filter(r => r.toString() !== blogToDelete._id.toString())
  await user.save()

  response.status(200).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  const result = await Blog.findByIdAndUpdate(request.params.id, body, { new: true }).populate('user', { username: 1, name: 1 })

  response.status(200).json(result.toJSON())

})

module.exports = blogsRouter