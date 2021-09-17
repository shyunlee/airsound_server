import { Request, Response } from 'express'
import * as userRepository from '../data/auth'

export const signup = async (req: Request, res: Response): Promise<void> => {
  const result = await userRepository.editUserInfo(1, req.body)
  res.status(200).json({message: 'ok', data: result})
}

export const login = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({message: 'ok'})
}

export const logout = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({message: 'ok'})
}
