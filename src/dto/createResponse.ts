import { Response } from 'express'

export interface ICreateResponse {
  res: Response
  status: number
  innerStatus: Boolean
  message: String
  responseData?: any
}
