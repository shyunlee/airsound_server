import { Request, Response } from 'express'
import * as authRepository from '../data/auth'
import { RequestT } from '../middleware/auth'


export const getUserInfo = (req: Request, res: Response) => {
  res.status(200).json({message: 'ok'})
}

export const editUserInfo = async (req: RequestT, res: Response) => {
  const userId = req.userId!
  const edit = req.body
  const result = await authRepository.editUserInfo(userId, edit)
  res.status(200).json({message: 'ok', data: result})
}