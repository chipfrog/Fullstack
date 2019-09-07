const dummy = (blogs) => {
  return 1
}
const totalLikes = (blogs) => {
  let likes = 0
  blogs.forEach(blog => {
    likes += blog.likes
  });
  return likes
}
const favoriteBlog = (blogs) => {
  let mostLikedBlog = blogs[0]
  blogs.forEach(blog => {
    if (blog.likes > mostLikedBlog.likes) {
      mostLikedBlog = blog
    }
  })
  console.log(mostLikedBlog)
  return mostLikedBlog
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}