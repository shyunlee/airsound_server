import SoundModel, {} from '../models/sounds'
import VideoModel, {} from '../models/videos'
import MoodModel, {} from '../models/moods'
import MoodSoundModel, {} from '../models/mood_sounds'

MoodModel.belongsTo(VideoModel, {foreignKey: 'videoId'})
MoodModel.belongsToMany(SoundModel, {through: MoodSoundModel})

export const getAllSounds = async () => {
  return SoundModel.findAll({
    attributes:["id", "title", "srcImage", "srcSound", "volume"]
  })
}

export const getAllVideos = async () => {
  return VideoModel.findAll({
    attributes:["id", "title", "srcImage", "srcVideo"]
  })
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
        // include: [MoodSoundModel]
      }
    ]
  })

  return result
}

type MoodArg = {
  moodId?:number;
  userId: number;
  title: string | undefined;
  videoId: number | undefined;
  timer: number;
}

export const insertOnMood = async (mood: MoodArg) => {
  const result = await MoodModel.create(mood)
  return result.id
}

type MoodSoundArg = {
  moodId: number;
  sounds: Array<{soundId:number, customVolume:number}>;
}

export const insertOnMoodSound = async ({moodId, sounds}: MoodSoundArg) => {
  for (let i = 0; i < sounds.length; i++) {
    await MoodSoundModel.create({
      moodId,
      soundId:sounds[i].soundId,
      customVolume: sounds[i].customVolume
    })
  }
  const result = await MoodSoundModel.findAll({
    attributes: ["id", "moodId", "soundId", "customVolume"],
    where: {moodId}
  })
  return result
}

export const editOnMood = async (mood: MoodArg) => {
  const {title, videoId, timer, moodId} = mood
  const result = await MoodModel.update({
    title,
    videoId,
    timer
  }, {
    where:{id: moodId}
  })
  return result
}

export const editOnMoodSound = async ({moodId, sounds}: MoodSoundArg) => {
  const deleted = await deleteOnMoodSound(moodId)
  const result = await insertOnMoodSound({moodId, sounds})
  return result
}

export const getMoodByMoodId = async (moodId: number) => {
  const moodFound = await MoodModel.findByPk(moodId, {
    attributes:[
      "id",
      "title",
      "userId",
      "timer",
    ],
    include:[
      {
        model: VideoModel,
        attributes: ["id", "title", "srcImage", "srcVideo"]
      }, 
      {
        model:SoundModel, 
        attributes:["id", "title", "srcImage", "srcSound", "volume"],
        // include: [MoodSoundModel]
      }
    ]
  })
  return moodFound
}

export const getUserIdByMoodId = async (moodId: number) => {
  const result = await MoodModel.findByPk(moodId, {
    attributes:["userId"]
  })

  return result
}

export const deleteOnMood = async (moodId: number) => {
  return await MoodModel.destroy({
    where: {
      id: moodId
    }
  })
}

export const deleteOnMoodSound = async (moodId: number) => {
  return await MoodSoundModel.destroy({
    where: {
      moodId
    }
  })
}


