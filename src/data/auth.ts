import bcrypt from 'bcrypt'
import { config } from '../config/config'
import UserModel, {UserCreationAttributes, UserInstance } from '../models/users'

export const getById = async (id:number) => {
  return UserModel.findByPk(id)
}

export const getByUsername = async (username: string) => {
  return UserModel.findOne({where:{username}})
}

export const getByEmail = async (email: string, authProvider: string) => {
  return UserModel.findOne({where:{email, authProvider}})
}

export const createUser = async (userInfo: UserCreationAttributes) => {
  return UserModel.create(userInfo).then(user => {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      srcImage: user.srcImage,
      authProvider: user.authProvider
    }
  })
}

type Edit = {
  username?: string,
  email?: string,
  currentPassword?: string;
  newPassword?: string;
  srcImage?:string
}

export const editUserInfo = async (id: number, edit:Edit) => {
  const username = edit.username && edit.username 
  const email = edit.email && edit.email
  const currentPassword = edit.currentPassword && edit.currentPassword
  const newPassword = edit.newPassword && edit.newPassword
  const srcImage = edit.srcImage && edit.srcImage
  
  return UserModel.findByPk(id).then( async (user) => {
    user = user! as UserInstance
    let message: string = 'update completed'
    if (srcImage) {
      user.srcImage = srcImage
    }
    if (username) {
      user.username = username
    }
    if (email) {
      user.email = email
    }
    if (newPassword) {
      const isMatched = await bcrypt.compare(currentPassword!, user.password!)
      if (isMatched) {
        user.password = await bcrypt.hash(newPassword, config.bcrypt.saltRounds)
      } else {
        message = 'password unmatched'
      }
    }
    return user.save().then(user => ({id:user.id, username:user.username, email:user.email, srcImage: user.srcImage, message}))
  })
}