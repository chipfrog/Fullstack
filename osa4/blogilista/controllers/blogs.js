const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    })
    if (blog.likes === null || blog.likes === undefined) {
        blog.likes = 0
    }
    
    try {
        const savedBlog = await blog.save()
        response.json(savedBlog.toJSON())

    } catch(error) {
        next(error)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch (error) {
        next(error)
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body
    console.log(request.body)

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    }
    
    try {
        await Blog.findByIdAndUpdate(request.params.id, blog, { new: true})
        response.status(200).end()
    } catch(error) {
        next(error)
    }
    
})

module.exports = blogsRouter