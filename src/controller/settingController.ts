import { Request, Response } from 'express'
import * as authRepository from '../data/auth'


export const getUserInfo = (req: Request, res: Response) => {
  res.status(200).json({message: 'ok'})
}

export const editUserInfo = (req: Request, res: Response) => {
  res.status(200).json({message: 'ok'})
}