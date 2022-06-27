import express, { Router } from 'express'
import { UserController } from '../controllers'
import { verifyToken } from '../helpers/middlewares'

const router: Router = express.Router()

router.post('/create', UserController.CreateUser)
router.get('/most-liked', UserController.ListMostLikeUsers)
router.get('/:id', UserController.ListOfLikes)
router.post('/login', UserController.LoginUser)

router.get('/me', verifyToken, UserController.GetLoginUser)
router.put('/me/updte-password', verifyToken, UserController.UpdatePassword)
router.put('/:id/like', verifyToken, UserController.LikeUser)
router.put('/:id/unlike', verifyToken, UserController.UnlikeUser)

export const userRoutes = router
