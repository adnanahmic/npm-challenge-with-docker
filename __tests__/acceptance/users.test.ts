import app from '../../app'
import request from 'supertest'
import setUpDatabase from '../../src/helpers/db'

// Configurations
import { config } from 'dotenv'
config()

beforeAll(() => {
  // Configuring Port
  app.listen(process.env.TEST_PORT, () => {
    console.log(`app listening at http://localhost:${process.env.TEST_PORT}`)
  })

  // MongoDB Connection
  setUpDatabase()
})

beforeEach(function () {
  jest.setTimeout(10000)
});

// Data & Payload
const userPayload = {
  username: 'adnanahmic',
  password: 'password',
}
const NewPassword = 'password1';
let user: any;

// Create User
it('CREATE USER', async () => {
  const response = await request(app).post('/api/user/create').send(userPayload)
  expect(response.status).toBe(200)
})

// Login
it('Auth Login', (done) => {
  request(app).post('/api/user/login').send(userPayload).end((err, res) => {
    user = res.body.data
    expect(res.status).toBe(200);
    done();
  })
})

// CURRENT USER
it('GET DATA OF CURRENT USER', async () => {
  const response = await request(app).get('/api/user/me').set({ Authorization: `Bearer ${user.token}` }).send()
  expect(response.status).toBe(200)
})

// UPDATE PASSWORD
it('UPDATE PASSWORD', async (done) => {
  request(app).post('/api/user/me/updte-password').set({ Authorization: `Bearer ${user.token}` }).send({
    current_password: userPayload.password,
    new_password: NewPassword,
    user_id: user._id
  }).end((err, res) => {
    user = res.body.data
    expect(res.status).toBe(200);
    done();
  })
})

// MOST LIKED
it('MOST LIKED', async () => {
  const response = await request(app).get('/api/user/most-liked')
  expect(response.status).toBe(200)
})

// GET LIKES OF USER
it('LIKES OF USER', async () => {
  const response = await request(app).get(`/api/user/likes/${user._id}`)
  expect(response.status).toBe(200)
})

// LIKE USER
it('LIKE A USER', async () => {
  const response = await request(app).put(`/api/user/${user._id}/like`).send({
    user_id: user._id
  })
  expect(response.status).toBe(200)
})

// UNLIKES USER
it('UNLIKE A USER', async () => {
  const response = await request(app).put(`/api/user/${user._id}/unlike`).send({
    user_id: user._id
  })
  expect(response.status).toBe(200)
})
