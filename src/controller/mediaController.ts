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

// export const getAllVideos = (req: Request, res: Response) => {
//   res.status(200).json({messae: 'ok'})
// }

// export const getAllSounds = (req: Request, res: Response) => {
//   res.status(200).json({messae: 'ok'})
// }

export const saveMood = async (req: RequestT, res: Response) => {
  if (!req.userId) {
    return res.status(400).json({message: 'member only'})
  }
  try {
    const {userId, title, timer, videoId, sounds} = req.body
    const moodId = await mediaRepository.insertOnMood({userId, title, timer, videoId})
    const result = await mediaRepository.insertOnMoodSound({moodId, sounds})
    res.status(200).json({messae: 'ok'})
  } catch (error) {
    console.log(error)
    res.status(400).json({message: 'something went wrong'})
  }
}

export const editMood = async (req: RequestT, res: Response) => {
  if (!req.userId) {
    return res.status(400).json({message: 'member only'})
  }
  try {
    const {userId, moodId, title, timer, videoId, sounds} = req.body
    const response = await mediaRepository.editOnMood({userId, moodId, title, timer, videoId })
    if (response[0] !== 0) { 
      const result = await mediaRepository.editOnMoodSound({moodId, sounds})
      return res.status(200).json({messae: 'ok', data: result})
    }
    res.status(400).json({messae: 'something went wrong'})
  } catch (error) {
    console.log(error)
    res.status(400).json({message: 'something went wrong'})
  }
}

export const deleteMood = async (req: RequestT, res: Response) => {
  if (!req.userId) {
    return res.status(400).json({message: 'member only'})
  }
  try {
    const moodId = req.body.moodId
    const response = await mediaRepository.deleteOnMood(moodId)
    const result = await mediaRepository.deleteOnMoodSound(moodId)
    if (response === 1 && result !== 0) {
      res.status(200).json({message: 'ok'})
    }
    res.status(200).json({message: 'something went wrong'})
  } catch (error) {
    console.log(error)
    res.status(400).json({message: 'something went wrong'})
  }
}