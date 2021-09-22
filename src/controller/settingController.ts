import { Request, Response } from 'express'
import * as authRepository from '../data/auth'


export const getUserInfo = (req: Request, res: Response) => {
  res.status(200).json({message: 'ok'})
}

export const editUserInfo = async (req: Request, res: Response) => {
  const {userId, edit} = req.body
  const result = await authRepository.editUserInfo(userId, edit)
  res.status(200).json({message: 'ok', data: result})
}