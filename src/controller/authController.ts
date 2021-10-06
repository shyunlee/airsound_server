import { CookieOptions, Request, Response } from 'express'
import axios, { AxiosResponse } from 'axios'
import qs from 'qs'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as authRepository from '../data/auth'
import { config } from '../config/config'
import { RequestT } from '../middleware/auth'

export const signup = async (req: Request, res: Response) => {
  const userFound = await authRepository.getByEmail(req.body.email, 'web')
  if (userFound) {
    return res.status(409).json({message: 'user aleady registerd'})
  }
  const hashed = await bcrypt.hash(req.body.password, config.bcrypt.saltRounds)
  const userInfo = {...req.body, password: hashed, authProvider:'web'}
  const userCreated = await authRepository.createUser(userInfo)
  const token = createToken(userCreated.id)
  setToken(res, token)
  res.status(200).json({message: 'ok', data:userCreated})
}

export const login = async (req: Request, res: Response) => {
  const userFound = await authRepository.getByEmail(req.body.email, 'web')
  if (userFound) {
    const verified = await bcrypt.compare(req.body.password, userFound.password!)
    if (verified) {
      const token = createToken(userFound.id)
      const userInfo = {
        id: userFound.id,
        username: userFound.username,
        email: userFound.email,
        srcImage: userFound.srcImage,
      }
      setToken(res, token)
      return res.status(200).json({message:'ok', data:userInfo})
    }
  }
  res.status(406).json({message: 'login failed'})
}

export const githubLogin = async (req: Request, res: Response) => {
  const authCode = req.body.authCode
  const queryString = qs.stringify({
    client_id:config.github.clientID,
    client_secret: config.github.secretKey,
    code: authCode,
    redirect_uri: config.oAuth.redirectURI
  })
  const authRequestUrl = `https://github.com/login/oauth/access_token?${queryString}`
  const response = await axios.post(authRequestUrl)
  if (response.status === 200) {
    const accessToken = (response.data! as string).split('=')[1].split('&')[0]
    const userFound = await axios.get<any>('https://api.github.com/user', {
      headers: {
        Accept: 'application/json',
        Authorization: `token ${accessToken}`
      }}).then(result => result.data)
      
    const userInfo = {
      username: userFound.name as string, 
      email: userFound.email as string,
      srcImage: userFound.avatar_url as string,
      authProvider: 'github',
      createdAt: new Date()
    }
    const userRegistered = await authRepository.getByEmail(userInfo.email, 'github')
    let userResponse;
    if (!userRegistered) {
      userResponse = await authRepository.createUser(userInfo)
    } else {
      userResponse = {
        id: userRegistered.id,
        username: userRegistered.username,
        email: userRegistered.email,
        srcImage: userRegistered.srcImage,
      }
    }
    const token = createToken(userResponse.id)
    setToken(res, token)
    res.status(200).json({message: 'ok', data: userResponse})
  }
}

export const googleLogin = async (req: Request, res: Response) => {
  const authCode = req.body.authCode
  const queryString = qs.stringify({
    code: authCode,
    client_id:config.google.clientID,
    client_secret:config.google.secretKey,
    grant_type: 'authorization_code',
    redirect_uri: config.oAuth.redirectURI
  })
  const authRequestUrl = `https://oauth2.googleapis.com/token?${queryString}`
  const response = await axios.post<any>(authRequestUrl, null)
  const accessToken = response.data.access_token
  const userFound = await axios.get<any>(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`).then(result => result.data)
  const userRegistered = await authRepository.getByEmail(userFound.email, 'google')
    let userResponse;
    if (!userRegistered) {
      const userInfo = {
        username: userFound.name as string, 
        email: userFound.email as string,
        srcImage: userFound.picture as string,
        authProvider: 'google',
        createdAt: new Date()
      }
      userResponse = await authRepository.createUser(userInfo)
    } else {
      userResponse = {
        id: userRegistered.id,
        username: userRegistered.username,
        email: userRegistered.email,
        srcImage: userRegistered.srcImage,
      }
    }
  const token = createToken(userResponse.id)
  setToken(res, token)
  res.status(200).json({message: 'ok', data: userResponse})
}


export const logout = async (req: Request, res: Response): Promise<void> => {
  res.cookie('token', '')
  res.status(200).json({message: 'ok'})
}


export const me = async (req: RequestT, res: Response) => {
  const userFound = await authRepository.getById(req.userId!)
  if (!userFound) {
    return res.status(404).json({message:'user not found'})
  }
  const response = {
    id: userFound.id,
    username: userFound.username,
    email: userFound.email,
    srcImage: userFound.srcImage,
  }
  res.status(200).json({message: 'ok', data:response})
}


const createToken = (id: number) => {
  return jwt.sign({id}, config.jwt.secretKey, {expiresIn: config.jwt.expiredInSec})
}

const setToken = (res: Response, token: string) => {
  const options: CookieOptions = {
    maxAge: config.jwt.expiredInSec * 1000,
    httpOnly: true,
    sameSite: 'none',
    secure: true
  }
  res.cookie('token', token)
}