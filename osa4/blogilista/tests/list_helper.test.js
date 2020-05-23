const listHelper = require('../utils/list_helper')

describe('dummy', () => {
  test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const listOfMultipleBlogs = [
    {
      _id: '5a422aafasdfsdafasdd17f8',
      title: 'Title0',
      author: 'Name0',
      url: 'http://url0.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54357f8',
      title: 'Title1',
      author: 'Name1',
      url: 'http://url1.html',
      likes: 3,
      __v: 0
    },
    {
      _id: '5a422aa71bsdsdfsdsdf17f8',
      title: 'Title2',
      author: 'Name2',
      url: 'http://url2.html',
      likes: 1,
      __v: 0
    }
  ]

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(listWithOneBlog[0].likes)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listOfMultipleBlogs)
    expect(result).toBe(9)
  })
})
