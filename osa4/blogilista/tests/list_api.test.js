const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('all blogs returned as json', async () => {
  const response = await api
    .get('/api/blogs/')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('id property is defined', async () => {

  const response = await helper.blogsInDB()
  expect(response[0].id).toBeDefined()
})

test('adding blogs', async () => {
  const objectToAdd = {
    title: 'Added Title',
    author: 'Added Name',
    url: 'http://urlAdded.html',
    likes: 7
  }

  await api.post('/api/blogs')
    .send(objectToAdd)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const finalList = await helper.blogsInDB()
  expect(finalList).toHaveLength(helper.initialBlogs.length +1)

  const titles = finalList.map(r => r.title)
  expect(titles).toContain('Added Title')
})

test('empty likes field is converted to zero', async () => {
  const objectToAdd = {
    title: 'Added Title',
    author: 'Added Name',
    url: 'http://urlAdded.html'
  }

  await api.post('/api/blogs/')
    .send(objectToAdd)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const finalList = await helper.blogsInDB()
  expect(finalList[helper.initialBlogs.length].likes).toBe(0)

})

afterAll(() => {
  mongoose.connection.close()
})