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
  setUpDatabase(process.env.TEST_CONNECTION_STRING)
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
it('CREATE USER', (done) => {
  request(app).post('/api/user/create').send(userPayload).end((err, res) => {
    if (err) return done(err);

    user = res.body.data
    expect(res.status).toBeGreaterThanOrEqual(200);
    expect(res.status).toBeLessThan(300);
    expect(res.body.success).toBe(true);
    done();
  })
})

// Login
it('Auth Login', (done) => {
  request(app).post('/api/user/login').send(userPayload).end((err, res) => {
    if (err) return done(err);

    user = res.body.data
    expect(res.status).toBeGreaterThanOrEqual(200);
    expect(res.status).toBeLessThan(300);
    done();
  })
})

// CURRENT USER
it('GET DATA OF CURRENT USER', async () => {
  const response = await request(app).get('/api/user/me').set({ Authorization: `Bearer ${user.token}` }).send()
  expect(response.status).toBeGreaterThanOrEqual(200)
  expect(response.status).toBeLessThan(300)
})

// UPDATE PASSWORD
it('UPDATE PASSWORD', (done) => {
  let data = {
    current_password: userPayload.password,
    new_password: NewPassword,
    user_id: user._id
  };

  request(app).put('/api/user/me/updte-password').set({ Authorization: `Bearer ${user.token}` }).send(data).end((err, res) => {
    if (err) return done(err);

    user = res.body.data
    expect(res.status).toBeGreaterThanOrEqual(200);
    expect(res.status).toBeLessThan(300);
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
it('LIKE A USER', (done) => {
  console.log(`/api/user/${user._id}/like`);
  
  request(app).put(`/api/user/${user._id}/like`).set({ Authorization: `Bearer ${user.token}` }).send({user_id: user._id}).end((err, res) => {
    if (err) return done(err);
    expect(res.status).toBeGreaterThanOrEqual(200);
    expect(res.status).toBeLessThan(300);
    done();
  })
})

// UNLIKES USER
it('UNLIKE A USER', (done) => {
  request(app).put(`/api/user/${user._id}/unlike`).set({ Authorization: `Bearer ${user.token}` }).send({user_id: user._id}).end((err, res) => {
    if (err) return done(err);
    expect(res.status).toBeGreaterThanOrEqual(200);
    expect(res.status).toBeLessThan(300);
    done();
  })
})
