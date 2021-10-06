import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload, VerifyCallback } from 'jsonwebtoken'
import { config } from '../config/config';
import * as authRepository from '../data/auth'

interface RequestAdded {
  userId?: number;
  token?: string;
}
export interface RequestT extends Request , RequestAdded {}

export const isAuth = (req: RequestT, res: Response, next: NextFunction) => {
  let token:string | undefined;
  const auth = req.get('Authorization')
  if (auth && auth.startsWith('Bearer ')) {
    token = auth.split(' ')[1]
  }
  if (!token) {
    token = req.cookies['token']
  }
  if (!token) {
    return res.status(404).json({message: 'invalid token'})
  }

  const jwtCallBack: VerifyCallback = async (err, decoded) => {
    if (err) {
      console.log(err)
      return res.status(401).json({message: 'Authentication Error_1'})
    }
    const userFound = await authRepository.getById(decoded?.id)
    if (!userFound) {
      return res.status(401).json({message: 'Authentication Error_2'})
    }
    req.userId = userFound.id
    req.token = token
    next()
  }  
  jwt.verify(token, config.jwt.secretKey, jwtCallBack)
}

export const isMember = (req: RequestT, res: Response, next: NextFunction) => {
  let token:string | undefined;
  const auth = req.get('Authorization')
  if (auth && auth.startsWith('Bearer ')) {
    token = auth.split(' ')[1]
  }
  if (!token) {
    token = req.cookies['token']
  }
  if (!token) {
    return next()
  }
  console.log(req)
  const jwtCallBack: VerifyCallback = async (err, decoded) => {
    if (err) {
      if (req.path === '/media/all') {
        return next()
      }
      console.log(err)
      return res.status(401).json({message: 'Authentication Error_3'})
    }
    const userFound = await authRepository.getById(decoded?.id)
    if (!userFound) {
      return res.status(401).json({message: 'Authentication Error_4'})
    }
    req.userId = userFound.id
    req.token = token
    next()
  }
  
  jwt.verify(token, config.jwt.secretKey, jwtCallBack)
}
