const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')
const listHelper = require('../utils/list_helper')

beforeEach(async () => {
    await Blog.remove({})

    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

test('blogs returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('right number of blogs returned', async () => {
    const response = await helper.blogsInDb()
    expect(response.length).toBe(helper.initialBlogs.length)
})

test('blog identifying field is named "id"', async () => {
    const response = await helper.blogsInDb()
    expect(response[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'Testiteos',
        author: 'Aapo Aapinen',
        url: 'www.google.com',
        likes: 2
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsAfter = await helper.blogsInDb()
    expect(blogsAfter.length).toBe(helper.initialBlogs.length + 1)
    
    const titles = blogsAfter.map(b => b.title)
    expect(titles).toContain(newBlog.title)
    
})

test('if no value is given for likes it is set to 0', async () => {
    const newBlog = {
        title: 'No likes',
        author: 'No fans',
        url: 'no site',
        likes: null
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await helper.blogsInDb()
    expect(response[response.length - 1].likes).toBe(0)
    
})

test('if value field doesnt exist it is set to 0', async () => {
    const newBlog = {
        title: 'Still no likes',
        author: 'Still no fans',
        url: 'Still no site',
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await helper.blogsInDb()
    expect(response[response.length - 1].likes).toBe(0)
})

test('if title and url are null return 400', async () => {
    const newBlog = {
        title: null,
        author: 'No fans',
        url: null,
        likes: 5
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        
})

test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).not.toContain(blogToDelete.title)
})

test('a blog can be updated', async () => {
    const originalBlogs = await helper.blogsInDb()
    const blogToUpdate = originalBlogs[0]

    const updatedBlog = {
        title: 'Updated title',
        author: 'Updated author',
        url: 'updated url',
        likes: 500
    }

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(200)

    const blogs = await helper.blogsInDb()
    const blogAfterUpdate = blogs.find(b => b.id === blogToUpdate.id)
    expect(blogAfterUpdate.title).toBe('Updated title')
    expect(helper.initialBlogs.length).toBe(blogs.length)
    
})

test('author with most blogs is correct', async () => {
    const response = await helper.blogsInDb()
    const result = listHelper.mostBlogs(response)
    expect(result.author).toBe('Robert C. Martin')
    expect(result.blogs).toBe(3)

})

test('author with most likes is correct', async () => {
    const response = await helper.blogsInDb()
    const result = listHelper.mostLikes(response)
    expect(result.author).toBe('Edsger W. Dijkstra')
    expect(result.likes).toBe(17)
})

afterAll(() => {
    mongoose.connection.close()
})