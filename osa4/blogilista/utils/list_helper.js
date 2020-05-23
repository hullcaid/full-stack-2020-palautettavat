const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likeCounter = (sum, blog) => {
    sum += blog.likes
    return sum
  }

  const likes = blogs.reduce(likeCounter, 0)

  return blogs.length === 0 ? 0 : likes
}

const favoriteBlog = (blogs) => {
  if(blogs.length > 0) {
    const { title, author, likes } = blogs[0]
    const first = { title: title, author: author, likes: likes}

    const getFavorite = (best, blog) => {
      if (best.likes < blog.likes) {
        best.title = blog.title
        best.author = blog.author
        best.likes = blog.likes
      }
      return best
    }

    const favorite = blogs.reduce(getFavorite, first)

    return favorite
  }
  return {}
}

module.exports = {
  dummy, totalLikes, favoriteBlog
}