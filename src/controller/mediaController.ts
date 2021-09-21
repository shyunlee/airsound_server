import { Request, Response } from 'express'
import { RequestT } from '../middleware/auth'
import * as mediaRepository from '../data/media'


export const getAllMedia = async (req: RequestT, res: Response) => {
  const videos = await mediaRepository.getAllVideos()
  const sounds = await mediaRepository.getAllSounds()
  if (!req.userId) {
    return res.status(200).json({messae: 'ok', data:{videos, sounds}})
  }
  const moods = await mediaRepository.getMoodsByUser(req.userId)
  res.status(200).json({messae: 'ok', data:{moods, videos, sounds}})
}

export const getAllVideos = (req: Request, res: Response) => {
  res.status(200).json({messae: 'ok'})
}

export const getAllSounds = (req: Request, res: Response) => {
  res.status(200).json({messae: 'ok'})
}

export const saveMood = (req: RequestT, res: Response) => {
  res.status(200).json({messae: 'ok'})
}

export const editMood = (req: RequestT, res: Response) => {
  res.status(200).json({messae: 'ok'})
}

export const deleteMood = (req: RequestT, res: Response) => {
  res.status(200).json({messae: 'ok'})
}