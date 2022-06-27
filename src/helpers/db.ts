import mongoose from 'mongoose'
import { config } from 'dotenv'
config()

const setUpDatabase = () => {
  mongoose
    .connect(process.env.CONNECTION_STRING as string)
    .then((res) => {
      console.log('MongoDb Connected')
    })
    .catch((err) => {
      console.log('ERROR - Unable to connect to the database: ', err)
    })

  mongoose.Promise = global.Promise
}

export default setUpDatabase
