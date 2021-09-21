import UsersModel, {} from '../models/users'
import SoundModel, {} from '../models/sounds'
import VideoModel, {} from '../models/videos'
import MoodModel, {} from '../models/moods'
import MoodSoundModel, {} from '../models/mood_sounds'
import { Sequelize } from 'sequelize'

MoodModel.belongsTo(VideoModel, {foreignKey: 'videoId'})
MoodModel.belongsToMany(SoundModel, {through: MoodSoundModel})


export const getAllSounds = async () => {
  return SoundModel.findAll()
}

export const getAllVideos = async () => {
  return VideoModel.findAll()
}

export const getMoodsByUser = async (id: number) => {
  const result = await MoodModel.findAll({
    attributes:[
      "id",
      "title",
      "userId",
      "timer",
    ],
    where:{userId: id},
    include:[
      {
        model: VideoModel,
        attributes: ["id", "title", "srcImage", "srcVideo"]
      }, 
      {
      model:SoundModel, 
      attributes:["id", "title", "srcImage", "srcSound", "volume"],
    }
    ]
  })

  return result
}
