import { Application } from 'express'
import { userRoutes } from './userRoutes'

export const initRoutes = (app: Application) => {
  app.get('/', (req, res, next) => {
    return res.status(200).json({
      message: "Welcome to the restAPI service"
    })
  })

  app.use('/api/user', userRoutes)
}
