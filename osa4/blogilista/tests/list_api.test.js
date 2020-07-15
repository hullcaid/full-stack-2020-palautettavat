const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')



describe('with a initialized database', () => {

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

  describe('adding blogs', () => {
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

    test('adding blogs without title and url return an error', async () => {
      const objectToAdd = {
        author: 'Added Name',
        likes: 3
      }

      await api.post('/api/blogs/')
        .send(objectToAdd)
        .expect(400)
    })
  })

  describe('deleting blogs', () => {
    test('deleting one is responded with 200', async () => {
      const blogsAtStart = await helper.blogsInDB()
      const blogToDelete = blogsAtStart[0]

      await api.delete(`/api/blogs/${blogToDelete.id}`)
        .expect(200)

      const finalList = await helper.blogsInDB()
      const ids = finalList.map(r => r.id)
      expect(ids).not.toContain(blogToDelete.id)
    })
  })

  describe('modifying blogs', () => {
    test('modifying likes', async () => {
      const blogsAtStart = await helper.blogsInDB()
      const blogToModify = blogsAtStart[0]
      const modifiedBlog = { ...blogToModify, likes: 7 }

      const response = await api.put(`/api/blogs/${blogToModify.id}`)
        .send(modifiedBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(response.body.title).toBe(blogToModify.title)

      const finalEntry = await api.get(`/api/blogs/${blogToModify.id}`)
        .expect(200)

      expect(finalEntry.body.likes).toBe(modifiedBlog.likes)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})