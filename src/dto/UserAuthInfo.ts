import { Request } from 'express'

export interface IGetUserAuthInfoRequest extends Request {
  user: any
}

export interface JwtPayload {
  user_id: string
  username: string
  iat: number
  exp: number
}
