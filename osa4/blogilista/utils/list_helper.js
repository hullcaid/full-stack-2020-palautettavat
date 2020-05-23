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

module.exports = {
  dummy, totalLikes
}