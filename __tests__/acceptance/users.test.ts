import app from '../../app'
import request from 'supertest'
import mongoose from 'mongoose'
import setUpDatabase from '../../src/helpers/db'

// Configurations
import { config } from 'dotenv'
config()

// Configuring Port
app.listen(process.env.PORT, () => {
  console.log(`app listening at http://localhost:${process.env.PORT}`)
})

// MongoDB Connection
setUpDatabase()

// Data & Payload
const userPayload = {
  username: 'adnanahmic',
  password: 'password',
}
const NewPassword = 'password1';
let user: any;

it('CREATE USER', async () => {
  const response = await request(app).post('/api/user/create').send(userPayload)
  expect(response.status).toBe(200)
  expect(response.body.success).toEqual(true)
})

it('should login user', async () => {
  const response = await request(app).post('/api/user/login').send(testUser)
  expect(response.status).toBe(200)
  expect(response.body.success).toEqual(true)
})

// it('should get the details of login user', async () => {
//   const response = await request(app).get('/api/user/me')
//   expect(response.status).toBe(200)
//   expect(response.body.success).toEqual(true)
// })

// This Needs a manual input userID in the body
// it('should update the password', async () => {
//   const response = await request(app)
//     .put('/api/user/me/update-password')
//     .send(updatePassword)
//   expect(response.status).toBe(200)
//   expect(response.body.success).toEqual(true)
// })

it('should get most liked user', async () => {
  const response = await request(app).get('/api/user/most-liked')
  expect(response.status).toBe(200)
  expect(response.body.success).toEqual(true)
})

// This Needs a manual input userID as param
// it('should get list of likes', async () => {
//   const response = await request(app).get('/api/user/623dd5982182435ad8c1a3d1')
//   expect(response.status).toBe(200)
//   expect(response.body.success).toEqual(true)
// })

// This Needs a manual input userID as param
// it('should Like the other user', async () => {
//   const response = await request(app).put(
//     '/api/user/623dd5982182435ad8c1a3d1/like'
//   )
//   expect(response.status).toBe(200)
//   expect(response.body.success).toEqual(true)
// })

// This Needs a manual input userID as param
// it('should get the details of login user', async () => {
//   const response = await request(app).put(
//     '/api/user/623dd5982182435ad8c1a3d1/unlike'
//   )
//   expect(response.status).toBe(200)
//   expect(response.body.success).toEqual(true)
// })
