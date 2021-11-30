import { Response } from 'express'
import { RequestT } from '../middleware/auth'
import * as mediaRepository from '../data/media'


export const getAllMedia = async (req: RequestT, res: Response) => {
  const videos = await mediaRepository.getAllVideos()
  const sounds = await mediaRepository.getAllSounds()
  const moods = req.userId ? await mediaRepository.getMoodsByUser(req.userId) : []
  
  res.status(200).json({message: 'ok', data:{moods, videos, sounds}})
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
    const userId = req.userId
    const {title, timer, videoId, sounds} = req.body
    const moodId = await mediaRepository.insertOnMood({userId, title, timer, videoId})
    const result = await mediaRepository.insertOnMoodSound({moodId, sounds})
    res.status(200).json({message: 'saved', data:moodId})
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
    const userId = req.userId
    const {id, title, timer, videoId, sounds} = req.body
    const moodId = id
    const response = await mediaRepository.editOnMood({userId, moodId, title, timer, videoId })
    if (response[0] !== 0) { 
      await mediaRepository.editOnMoodSound({moodId, sounds})
      const result = await mediaRepository.getMoodByMoodId(moodId)
      return res.status(200).json({message: 'updated', data: result?.getDataValue("id")})
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
    const moodId = Number(req.params.id)
    const userIdFound = await mediaRepository.getUserIdByMoodId(moodId)
    if (userIdFound?.userId === req.userId) {
      const response = await mediaRepository.deleteOnMood(moodId)
      const result = await mediaRepository.deleteOnMoodSound(moodId)
      if (response === 1 && result !== 0) {
        return res.status(200).json({message: 'ok'})
      }
    }
    res.status(200).json({message: 'something went wrong'})
  } catch (error) {
    console.log(error)
    res.status(400).json({message: 'something went wrong'})
  }
}