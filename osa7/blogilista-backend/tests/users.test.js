const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')

describe('User will not be added if', () => {
  beforeEach(async () => {
    await User.remove({})

    for (let user of helper.initialUsers) {
      let userObject = new User(user)
      await userObject.save()
    }
  })
  
  test('no username is given', async() => {
    const newUser = {
      username: null,
      name: "Testaaja",
      password: "secret"
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })
  test('no password is given', async() => {
    const newUser = {
      username:"Testaaja",
      name: "Testaaja",
      password: null
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })
  test('username is too short', async() => {
    const newUser = {
      username:"ab",
      name: "Testaaja",
      password: "secret"
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })
  test('password is too short', async() => {
    const newUser = {
      username:"Testaaja",
      name: "Testaaja",
      password: "ab"
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })
  test('username already exists', async() => {
    const newUser = {
      username:"Darwin",
      name: "Testaaja",
      password: "secret"
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })
  
})

describe('User is added if everything is ok', () => {
  test('Valid user can be added', async() => {
    const newUser = {
      username:"Charles",
      name: "Testaaja",
      password: "secret"
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAfter = await helper.usersInDb()
    expect(usersAfter.length).toBe(helper.initialUsers.length + 1)
    
    const usernames = usersAfter.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
