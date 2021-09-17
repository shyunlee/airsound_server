import SoundModel, {} from '../models/sounds'
import VideoModel, {} from '../models/videos'
import MoodeModel, {} from '../models/moods'
import MoodSoundModel, {} from '../models/mood_sound'

export const getAllSounds = async () => {
  return SoundModel.findAll()
}

export const getAllVideos = async () => {
  return VideoModel.findAll()
}

