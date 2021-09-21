import { CookieOptions, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as authRepository from '../data/auth'
import { config } from '../config/config'
import { RequestT } from '../middleware/auth'

export const signup = async (req: Request, res: Response) => {
  const userFound = await authRepository.getByEmail(req.body.email)
  if (userFound) {
    return res.status(400).json({message: 'user aleady registerd'})
  }
  const hashed = await bcrypt.hash(req.body.password, config.bcrypt.saltRounds)
  const userInfo = {...req.body, password: hashed}
  const id = await authRepository.createUser(userInfo)
  const token = createToken(id)
  setToken(res, token)
  res.status(200).json({message: 'ok', data:{id, token}})
  
}

export const login = async (req: Request, res: Response) => {
  const userFound = await authRepository.getByEmail(req.body.email)
  if (userFound) {
    const verified = await bcrypt.compare(req.body.password, userFound.password)
    if (verified) {
      const token = createToken(userFound.id)
      const userInfo = {
        id: userFound.id,
        username: userFound.username,
        email: userFound.email,
        src_image: userFound.src_image,
        token: token
      }
      setToken(res, token)
      return res.status(200).json({message:'ok', data:{userInfo}})
    }
  }
  res.status(400).json({message: 'login failed'})
}

export const logout = async (req: Request, res: Response): Promise<void> => {
  res.cookie('token', '')
  res.status(200).json({message: 'ok'})
}

export const me = async (req: RequestT, res: Response) => {
  const userFound = await authRepository.getById(req.userId!)
  if (!userFound) {
    return res.status(404).json({message:'user not found'})
  }
  res.status(200).json({message: 'ok', data:{id:userFound.id, token:req.token }})
}


const createToken = (id: number) => {
  return jwt.sign({id}, config.jwt.secretKey, {expiresIn: config.jwt.expiredInSec})
}

const setToken = (res: Response, token: string) => {
  const options: CookieOptions = {
    maxAge: config.jwt.expiredInSec * 1000,
    httpOnly: true,
    sameSite: 'none',
    secure: true
  }
  res.cookie('token', token, options)
}