const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const logger = require('../utils/logger')

usersRouter.post('/', async (request, response, next) => {
  const body = request.body

  if (!body.password) {
    logger.error('`password` missing')
    return response.status(400).json({ error: '`password` missing' })
  } else if (body.password.length < 4) {
    logger.error('`password` too short')
    return response.status(400).json({ error: '`password` must be over 3 characters long' })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const result = await User.find({})
  const users = result.map(user => user.toJSON())
  response.status(200).json(users)
})

module.exports = usersRouter