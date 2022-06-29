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
  username: Math.random().toString(36).substring(2,10+2),
  password: 'password'
}
const NewPassword = 'password1';
let user: any;

const mockFailUserPayload = {
  username: "testuser",
  password: "123445677",
};

// User Test Cases
it('Create User', (done) => {
  request(app).post('/api/user/create').send(userPayload).end((err, res) => {
    if (err) return done(err);

    user = res.body.data
    expect(res.status).toBeGreaterThanOrEqual(200);
    expect(res.status).toBeLessThan(300);
    expect(res.body.success).toBe(true);
    done();
  })
})

it('Create User | Required Fiels', (done) => {
  request(app).post('/api/user/create').send({username: "", password: ""}).end((err, res) => {
    if (err) return done(err);
    expect(res.status).toBe(400);
    done();
  })
})

it('Create User | Existing User', (done) => {
  request(app).post('/api/user/create').send({username: user.username, password: "password"}).end((err, res) => {
    if (err) return done(err);
    expect(res.status).toBe(409);
    done();
  })
})

// Login Test Cases
it('Auth Login', (done) => {
  request(app).post('/api/user/login').send(userPayload).end((err, res) => {
    if (err) return done(err);
    user = res.body.data
    expect(res.status).toBeGreaterThanOrEqual(200);
    expect(res.status).toBeLessThan(300);
    done();
  })
})

it("Auth Login | User Not Found", (done) => {
  request(app)
    .post("/api/user/login")
    .send(mockFailUserPayload)
    .end((err, res) => {
      if (err) return done(err);
      expect(res.status).toBe(404);
      done();
    });
});

it("Auth Login | Invalid Credentials", (done) => {
  request(app)
    .post("/api/user/login")
    .send({username: user.username, password: "wrongpassword"})
    .end((err, res) => {
      if (err) return done(err);
      expect(res.status).toBe(401);
      done();
    });
});

// CURRENT USER
it('Current User', async () => {
  const response = await request(app).get('/api/user/me').set({ Authorization: `Bearer ${user.token}` }).send()
  expect(response.status).toBeGreaterThanOrEqual(200)
  expect(response.status).toBeLessThan(300)
})

// UPDATE PASSWORD
it('Update Password', (done) => {
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


it('Update Password | Current password do not match', (done) => {
  let data = {
    current_password: "wrongpassword",
    new_password: NewPassword,
    user_id: user._id
  };

  request(app).put('/api/user/me/updte-password').set({ Authorization: `Bearer ${user.token}` }).send(data).end((err, res) => {
    if (err) return done(err);
    expect(res.status).toBe(400);
    done();
  })
})

// MOST LIKED
it('Most Liked', async () => {
  const response = await request(app).get('/api/user/most-liked')
  expect(response.status).toBe(200)
})

// GET LIKES OF USER
it('LIKES OF USER', async () => {
  const response = await request(app).get(`/api/user/likes/${user._id}`)
  expect(response.status).toBe(200)
})

// LIKE USER
it('Like User', (done) => {
  request(app).put(`/api/user/${user._id}/like`).set({ Authorization: `Bearer ${user.token}` }).send({user_id: user._id}).end((err, res) => {
    if (err) return done(err);
    expect(res.status).toBeGreaterThanOrEqual(200);
    expect(res.status).toBeLessThan(300);
    done();
  })
})

it('Like User | User to be followed does not exists', (done) => {
  request(app).put(`/api/user/${"wrong-user-id"}/like`).set({ Authorization: `Bearer ${user.token}` }).send({user_id: "wrong-user-id"}).end((err, res) => {
    if (err) return done(err);
    expect(res.status).toBe(404);
    done();
  })
})

// UNLIKES USER
it('Unlike UserUSER', (done) => {
  request(app).put(`/api/user/${user._id}/unlike`).set({ Authorization: `Bearer ${user.token}` }).send({user_id: user._id}).end((err, res) => {
    if (err) return done(err);
    expect(res.status).toBeGreaterThanOrEqual(200);
    expect(res.status).toBeLessThan(300);
    done();
  })
})
