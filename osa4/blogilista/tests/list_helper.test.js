const listHelper = require('../utils/list_helper')

describe('dummy', () => {
  test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })
})

const listWithOneBlog = [
  {
    _id: '5a422aafasdfsdafasdd17f8',
    title: 'Title0',
    author: 'Name0',
    url: 'http://url0.html',
    likes: 1,
    __v: 0
  }
]

const listOfMultipleBlogs = [
  listWithOneBlog[0],
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
    likes: 5,
    __v: 0
  }
]

describe('total likes', () => {

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

describe('favorite blog', () => {

  test('of empty list is empty object', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual({})
  })

  test('when list has only blog, it is the favorite', () => {
    const expectedResult = {
      title: listWithOneBlog[0].title,
      author: listWithOneBlog[0].author,
      likes: listWithOneBlog[0].likes
    }
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(expectedResult)
  })

  test('with list of blogs is the most liked one', () => {
    const expectedResult = {
      title: listOfMultipleBlogs[2].title,
      author: listOfMultipleBlogs[2].author,
      likes: listOfMultipleBlogs[2].likes
    }
    const result = listHelper.favoriteBlog(listOfMultipleBlogs)
    expect(result).toEqual(expectedResult)
  })
})