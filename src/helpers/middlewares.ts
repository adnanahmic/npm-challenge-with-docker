import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
import { JwtPayload } from '../dto/UserAuthInfo'
config()

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  let token = req.body.token || req.query.token || req.headers['authorization']

  token = token?.split(' ')[1]
  if (!token) {
    return res.status(403).json({
      success: false,
      message: 'A token is required for authentication',
    })
  }

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload
    if (decodedToken.exp < Date.now()) {
      req.body['user_id'] = decodedToken?.user_id
      next()
    } else {
      return res.status(401).json({
        success: false,
        message: 'Token Expired',
      })
    }
  } catch (err: any) {
    return res.status(401).json({
      success: false,
      message: err.message || 'Invalid Token',
    })
  }
}

const createToken = (_id: string, username: string) => {
  const token = jwt.sign(
    { user_id: _id, username },
    process.env.JWT_SECRET as string,
    {
      expiresIn: '1d',
    }
  )

  return token
}

export { verifyToken, createToken }
