import mongoose from 'mongoose'
import { config } from 'dotenv'
config()

const setUpDatabase = () => {
  let CONNECTION_STRING = process.env.CONNECTION_STRING;
  if(process.env.NODE_ENV === 'development')
    CONNECTION_STRING = process.env.TEST_CONNECTION_STRING

  mongoose.connect(CONNECTION_STRING as string).then((res) => {
    console.log('MongoDb Connected')
  }).catch((err) => {
    console.log('ERROR - Unable to connect to the database: ', err)
  })

  mongoose.Promise = global.Promise
}

export default setUpDatabase
