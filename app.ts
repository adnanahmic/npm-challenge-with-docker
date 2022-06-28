import express, { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { initRoutes } from './src/routes'

const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: 'Welcome to rest api services',
  })
})

initRoutes(app)

app.use(function (req, res, next) {
  res.header(`Access-Control-Allow-Origin`, `*`)
  res.setHeader(
    `Access-Control-Allow-Methods`,
    `POST, PUT, OPTIONS, DELETE, GET`
  )
  res.header(
    `Access-Control-Allow-Headers`,
    `Origin, X-Requested-With, Content-Type, Accept`
  )
  next()
})

export default app