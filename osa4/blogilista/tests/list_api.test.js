const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const { usersInDB, blogsInDB, addAUser, getToken } = require('./test_helper')

var token = ''
var user

describe('managing content', () => {

  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    user = await helper.addAUser()
    token = await getToken('root')

    const blogsToAdd = helper.initialBlogs.map(e => e = { ...e, user: user._id } )
    await Blog.insertMany(blogsToAdd)

  })

  describe('retrieving and blog properties', () => {
    test('all blogs returned as json', async () => {
      const response = await api
        .get('/api/blogs/')
        .expect(200)
        .expect('Content-Type', /application\/json/)
      expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('id property is defined', async () => {

      const response = await blogsInDB()
      expect(response[0].id).toBeDefined()
    })
  })

  describe('adding blogs with authorized user', () => {
    test('adding blogs', async () => {
      const objectToAdd = {
        title: 'Added Title',
        author: 'Added Name',
        url: 'http://urlAdded.html',
        likes: 7
      }

      await api.post('/api/blogs')
        .send(objectToAdd)
        .set({ Authorization: `bearer ${token}` })
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const finalList = await blogsInDB()
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
        .set({ Authorization: `bearer ${token}` })
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const finalList = await blogsInDB()
      expect(finalList[helper.initialBlogs.length].likes).toBe(0)
    })

    test('adding blogs without title and url return an error', async () => {
      const objectToAdd = {
        author: 'Added Name',
        likes: 3
      }

      await api.post('/api/blogs/')
        .send(objectToAdd)
        .set({ Authorization: `bearer ${token}` })
        .expect(400)
    })

    test('added blogs have user reference user', async () => {
      const newBlog = {
        title: 'Added Title',
        author: 'Added Name',
        url: 'http://urlAdded.html',
        likes: 4,
      }

      const result = await api.post('/api/blogs')
        .send(newBlog)
        .set({ Authorization: `bearer ${token}` })
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await usersInDB()
      expect(usersAtEnd[0].blogs[0].toString()).toContain(result.body.id)

      const blogsAtEnd = await blogsInDB()
      expect(blogsAtEnd[0].user.toString()).toContain(usersAtEnd[0].id)

    })
  })

  describe('deleting blogs with authorized user', () => {
    test('deleting one is responded with 200', async () => {
      const blogsAtStart = await blogsInDB()
      const blogToDelete = blogsAtStart[0]

      await api.delete(`/api/blogs/${blogToDelete.id}`)
        .set({ Authorization: `bearer ${token}` })
        .expect(200)

      const finalList = await blogsInDB()
      const ids = finalList.map(r => r.id)
      expect(ids).not.toContain(blogToDelete.id)
    })
  })

  describe('modifying blogs', () => {
    test('modifying likes', async () => {
      const blogsAtStart = await blogsInDB()
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

  describe('managing blocks without authorization', () => {
    test('adding a blog without token returns error', async () => {
      const objectToAdd = {
        title: 'Added Title',
        author: 'Added Name',
        url: 'http://urlAdded.html',
        likes: 7
      }

      await api.post('/api/blogs')
        .send(objectToAdd)
        .expect(401)
    })
  })

})

describe('user management and login', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})

    await addAUser()
  })

  describe('user management', () => {
    test('get to api returns correct amount of users', async () => {
      const usersAtStart = await usersInDB()

      const results = await api.get('/api/users/')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(results.body).toHaveLength(usersAtStart.length)
    })

    test('creating a new unique user', async () => {
      const usersAtStart = await usersInDB()

      const newUser = {
        username: 'lesjui',
        name: 'Leiska Jantteri',
        password: 'sanasana',
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await usersInDB()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })

    test('username must be unique', async () => {
      const usersAtStart = await usersInDB()

      const newUser = {
        username: 'root',
        name: 'wrong root',
        password: 'gagaaa'
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('`username` to be unique')

      const usersAtEnd = await usersInDB()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('adding user without username fails', async () => {
      const usersAtStart = await usersInDB()

      const newUser = {
        name: 'no username',
        password: 'gagaaa'
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('`username` is required')

      const usersAtEnd = await usersInDB()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('adding user without password fails', async () => {
      const usersAtStart = await usersInDB()

      const newUser = {
        username: 'noPass',
        name: 'no Password'
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('`password` missing')

      const usersAtEnd = await usersInDB()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('adding user with too short username fails', async () => {
      const usersAtStart = await helper.usersInDB()

      const newUser = {
        username: 'shr',
        name: 'too short username',
        password: 'gagaaa'
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('is shorter than the minimum allowed length (4)')

      const usersAtEnd = await helper.usersInDB()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('adding user with too short password fails', async () => {
      const usersAtStart = await usersInDB()

      const newUser = {
        username: 'shortPass',
        name: 'too short password',
        password: 'shr'
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('`password` must be over 3 characters long')

      const usersAtEnd = await usersInDB()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
  })

  describe('token authentication tests', () => {
    beforeEach(async () => {
      await User.deleteMany({})
      await Blog.deleteMany({})

      await addAUser()
    })

    test('login in returns a token', async () => {
      const loginInfo = {
        username: 'root',
        password: 'sekret'
      }

      const result = await api.post('/api/login')
        .send(loginInfo)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(result.body.token).toBeDefined()
    })

    test('wrong password returns an error', async () => {
      const loginInfo = {
        username: 'root',
        password: 'plop'
      }

      const result = await api.post('/api/login')
        .send(loginInfo)
        .expect(401)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('Invalid username or password')
    })

    test('wrong username returns an error', async () => {
      const loginInfo = {
        username: 'r00t',
        password: 'sekret'
      }

      const result = await api.post('/api/login')
        .send(loginInfo)
        .expect(401)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('Invalid username or password')
    })

  })
})

afterAll(() => {
  mongoose.connection.close()
})