import mongoose from 'mongoose'
import app from '../../index'
import { config } from 'dotenv'
import * as request from 'supertest'
config()

let connection
let server
const testUser = {
  username: 'adnan ahmic',
  password: 'something',
}

const updatePassword = {
  current_password: 'something',
  new_password: 'something123',
}

let userId = ''

beforeEach(async () => {
  connection = await mongoose.connect(
    'mongodb://127.0.0.1:27017/candidiateKnowledge'
  )
  server = app.listen(process.env.second_port)
})

it('should get most liked user', async () => {
  const response = await request(app).get('/api/user/most-liked')
  expect(response.status).toBe(200)
  expect(response.body.success).toEqual(true)
})

it('should create user', async () => {
  const response = await request(app).post('/api/user/create').send(testUser)
  expect(response.status).toBe(200)
  expect(response.body.success).toEqual(true)
})

it('should login user', async () => {
  const response = await request(app).post('/api/user/create').send(testUser)
  expect(response.status).toBe(200)
  expect(response.body.success).toEqual(true)
})

it('should get list of likes', async () => {
  const response = await request(app).get('/api/user/623dd5982182435ad8c1a3d1')
  expect(response.status).toBe(200)
  expect(response.body.success).toEqual(true)
})

it('should get the details of login user', async () => {
  const response = await request(app).get('/api/user/me')
  expect(response.status).toBe(200)
  expect(response.body.success).toEqual(true)
})

it('should update the password', async () => {
  const response = await request(app)
    .put('/api/user/me/update-password')
    .send(updatePassword)
  expect(response.status).toBe(200)
  expect(response.body.success).toEqual(true)
})

it('should Like the other user', async () => {
  const response = await request(app).put(
    '/api/user/623dd5982182435ad8c1a3d1/like'
  )
  expect(response.status).toBe(200)
  expect(response.body.success).toEqual(true)
})

it('should get the details of login user', async () => {
  const response = await request(app).put(
    '/api/user/623dd5982182435ad8c1a3d1/unlike'
  )
  expect(response.status).toBe(200)
  expect(response.body.success).toEqual(true)
})
