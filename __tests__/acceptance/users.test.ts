import mongoose from 'mongoose'
import app from '../../index'
import { config } from 'dotenv'
config()

beforeEach(async () => {
  console.log('this is the process.env.port: ', { porcess: process.env })
  let connection
  connection = await mongoose.connect(
    'mongodb://127.0.0.1:27017/candidiateKnowledge'
  )
  const server = app.listen(process.env.port)
})

it('simple test', () => {
  expect(1 + 1).toBe(2)
})
