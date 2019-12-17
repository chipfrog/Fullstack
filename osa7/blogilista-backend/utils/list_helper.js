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
  return mostLikedBlog
}
const mostBlogs = (blogs) => {
    let map = new Map()
    let uniqueAuthors = []
    blogs.forEach(blog => {
        if (!map.has(blog.author)) {
            map.set(blog.author, [blog.title])
            uniqueAuthors.push(blog.author)
        } else if (!map.get(blog.author).includes(blog.title)) {
            map.get(blog.author).push(blog.title)
        }
    })
    let authorWithMostBlogs = {
        author: null,
        blogs: null
    }
    uniqueAuthors.forEach(key => {
        if (map.get(key).length > authorWithMostBlogs.blogs) {
            authorWithMostBlogs.blogs = map.get(key).length
            authorWithMostBlogs.author = key
        }

    })
    return authorWithMostBlogs
}
const mostLikes = (blogs) => {
    let map = new Map()
    let uniqueAuthors = []
    blogs.forEach(blog => {
        if (!map.has(blog.author)) {
            map.set(blog.author, blog.likes)
            uniqueAuthors.push(blog.author)
        } else {
            let sum = blog.likes + map.get(blog.author)
            map.set(blog.author, sum)
        }
    })
    let author = {
        author: null,
        likes: null,
    }
    uniqueAuthors.forEach(key => {
        if (map.get(key) > author.likes) {
            author.author = key
            author.likes = map.get(key)
        }
    })
    return author
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}