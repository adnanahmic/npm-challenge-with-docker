import express, { Application, Request, Response, NextFunction } from 'express'
import { config } from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import setUpDatabase from './src/helpers/db'
import { initRoutes } from './src/Routes'

config()
process.env.NODE_ENV === 'production' && (console.log = () => null)

const app: Application = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: 'Congrats Project is SetUp',
  })
})

setUpDatabase()
initRoutes(app)

app.listen(process.env.port, () => {
  console.log(`app listening at http://localhost:${process.env.port}`)
})

app.use(function (req, res, next) {
  // allow cross origin requests
  res.setHeader(
    `Access-Control-Allow-Methods`,
    `POST, PUT, OPTIONS, DELETE, GET`
  )
  res.header(`Access-Control-Allow-Origin`, `http://localhost:3000`)
  res.header(
    `Access-Control-Allow-Headers`,
    `Origin, X-Requested-With, Content-Type, Accept`
  )
  next()
})
