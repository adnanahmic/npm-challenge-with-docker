import mongoose from 'mongoose'

const setUpDatabase = (ConnectionString) => {
  mongoose.connect(ConnectionString as string).then((res) => {
    console.log('MongoDb Connected')
  }).catch((err) => {
    console.log('ERROR - Unable to connect to the database: ', err)
  })

  mongoose.Promise = global.Promise
}

export default setUpDatabase
