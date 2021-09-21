import UserModel, {UserCreationAttributes, UserInstance } from '../models/users'

export const getById = async (id:number) => {
  return UserModel.findByPk(id)
}

export const getByUsername = async (username: string) => {
  return UserModel.findOne({where:{username}})
}

export const getByEmail = async (email: string) => {
  return UserModel.findOne({where:{email}})
}

export const createUser = async (userInfo: UserCreationAttributes) => {
  return UserModel.create(userInfo).then(result => result.id)
}

type Edit = {
  username?: string,
  email?:string,
  password?: string,
  src_image?:string
}

export const editUserInfo = async (id: number, edit:Edit) => {
  const username = edit.username && edit.username 
  const email = edit.email && edit.email
  const password = edit.password && edit.password
  const src_image = edit.src_image && edit.src_image
  
  return UserModel.findByPk(id).then((user) => {
    user = user! as UserInstance
    if (username) {
      user.username = username
    }
    if (email) {
      user.email = email
    }
    if (password) {
      user.password = password
    }
    if (src_image) {
      user.src_image = src_image
    }
    return user.save()
  })
}