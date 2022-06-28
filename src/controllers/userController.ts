import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import UserModal from '../models/userModal'
import FollowModal from '../models/LikeUser'
import { createToken } from '../helpers/middlewares'
import { createResponse } from '../helpers/createResponse'
import mongoose from 'mongoose'
import { json } from 'stream/consumers'

const CreateUser = async (
  req: Request<never, never, { username: string; password: string }, never>,
  res: Response,
  next: NextFunction
) => {
  try {
    let user
    const { username, password } = req.body || {}

    if (!username) {
      return res.status(400).json({
        success: false,
        message: 'Username is a required field',
      })
    }
    if (!password) {
      return res.status(400).json({
        success: false,
        message: 'Password is a required field',
      })
    }

    const existingUser = await UserModal.findOne({ username })
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User Already exists ',
      })
    }

    const hashedPassword: string = await bcrypt.hash(password, 10)

    user = await UserModal.create({
      username,
      password: hashedPassword,
    })

    const newtoken = await createToken(user._id as string, username as string)

    user.token = newtoken
    await user.save()

    return res.status(200).json({
      success: true,
      message: 'User Created Successfully',
      data: user,
    })
  } catch (err: any) {
    return res.status(404).json({
      success: false,
      message: err.message || 'Something Went Wrong',
    })
  }
}

const LoginUser = async (
  req: Request<never, never, { username: string; password: string }, never>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body || {}

    const user = await UserModal.findOne({ username })
    if (!user || !user.password) {
      return createResponse({
        innerStatus: false,
        status: 404,
        message: 'User Does Not Exist',
        res,
      })
    }
    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword) {
      return createResponse({
        innerStatus: false,
        status: 404,
        message: 'Password is not correct',
        res,
      })
    }

    const newtoken = await createToken(
      user._id as any as string,
      username as any as string
    )

    user.token = newtoken
    await user.save()

    res.status(200).json({
      status: 200,
      message: "User Logged In Successfully",
      data: user
    });
  } catch (err: any) {
    return createResponse({
      innerStatus: false,
      status: 404,
      message: err.message || 'Cannot Login User',
      res,
    })
  }
}

const GetLoginUser = async (
  req: Request<never, never, { user_id: mongoose.Types.ObjectId }, never>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user_id } = req.body || {}
    const User = await UserModal.findOne({ _id: user_id })

    if (!User?._id) {
      return createResponse({
        innerStatus: false,
        status: 404,
        message: 'User Does Not Exist',
        res,
      })
    }

    return createResponse({
      innerStatus: true,
      status: 200,
      message: 'User Fetched Successfully',
      res,
      responseData: User,
    })
  } catch (err: any) {
    return createResponse({
      innerStatus: false,
      status: 404,
      message: err.message || 'Cannot get Loged In User Information',
      res,
    })
  }
}

const UpdatePassword = async (
  req: Request<
    never,
    never,
    {
      current_password: string
      new_password: string
      user_id: mongoose.Types.ObjectId
    },
    never
  >,
  res: Response,
  next: NextFunction
) => {
  try {
    const { current_password, new_password, user_id } = req.body || {}
    if (current_password == new_password) {
      return createResponse({
        innerStatus: false,
        message: 'Old and New Password is same',
        res,
        status: 404,
      })
    }

    const user = await UserModal.findOne({ _id: user_id })
    const hashedPassword: string = await bcrypt.hash(new_password, 10)

    const newtoken = await createToken(
      user._id as any as string,
      user.username as any as string
    )
    user.token = newtoken
    user.password = hashedPassword
    await user.save()
  } catch (err: any) {
    return createResponse({
      innerStatus: false,
      status: 404,
      message: err.message || 'Cannot Change Password',
      res,
    })
  }
}

const LikeUser = async (
  req: Request<never, never, { user_id: string }, never>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user_id } = req.body || {}
    const { id } = req.params || {}

    const userToBeFollowed = await UserModal.findOne({ _id: id as string })
    const user = await UserModal.findOne({ _id: user_id })
    if (!userToBeFollowed) {
      return createResponse({
        innerStatus: false,
        status: 404,
        message: 'User TO be followed does not exists',
        res,
      })
    }

    const followRecord = await FollowModal.create({
      liked: id as mongoose.Types.ObjectId,
      likedBy: user_id,
    })

    user.likedBy.push(followRecord?._id)
    await user.save()

    return createResponse({
      innerStatus: true,
      status: 200,
      message: 'User Liked Succefully',
      res,
    })
  } catch (err: any) {
    return createResponse({
      innerStatus: false,
      status: 404,
      message: err.message || 'Cannot Like User',
      res,
    })
  }
}

const UnlikeUser = async (
  req: Request<never, never, { user_id: string }, never>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user_id } = req.body || {}
    const { id } = req.params || {}
    const followRecord = await FollowModal.findOne({
      liked: id as string,
      likedBy: user_id,
    })
    const user: any = await UserModal.findOne({ _id: user_id })

    const followRecordIds = user?.likedBy.filter(
      (val: mongoose.Types.ObjectId) => val != followRecord._id
    )

    await FollowModal.deleteOne({ _id: followRecord._id })

    user.likedBy = followRecordIds
    await user.save()

    return createResponse({
      innerStatus: true,
      status: 200,
      message: 'User Unliked Successfully',
      res,
    })
  } catch (err: any) {
    return createResponse({
      innerStatus: false,
      status: 404,
      message: err.message || 'Cannot Un-Like User',
      res,
    })
  }
}

const ListMostLikeUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await UserModal.find({
      $where: function () {
        return this.likedBy.length > 0
      },
    }).sort({ likedBy: 1 })

    return createResponse({
      innerStatus: true,
      status: 200,
      message: 'Fetching Successfull',
      res,
      responseData: users,
    })
  } catch (err: any) {
    return createResponse({
      innerStatus: false,
      status: 404,
      message: err.message || 'Failed To Fetch',
      res,
    })
  }
}

const ListOfLikes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params || {}

    const users = await UserModal.findOne({ _id: id }).select({
      username: 1,
      likedBy: 1,
    })

    return createResponse({
      innerStatus: true,
      status: 200,
      message: 'User Fetched Successfully',
      res,
      responseData: {
        username: users?.username,
        likedBy: users?.likedBy?.length,
      },
    })
  } catch (err: any) {
    return createResponse({
      innerStatus: false,
      status: 404,
      message: err.message || 'Fetching Failed',
      res,
    })
  }
}

export {
  CreateUser,
  LoginUser,
  GetLoginUser,
  UpdatePassword,
  LikeUser,
  UnlikeUser,
  ListMostLikeUsers,
  ListOfLikes,
}
