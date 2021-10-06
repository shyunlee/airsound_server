import { isAuth } from './../middleware/auth';
import express from 'express'
import * as authController from '../controller/authController'

const router = express.Router()

router.post('/signup', authController.signup)

router.post('/login', authController.login)

router.post('/github', authController.githubLogin)

router.post('/google', authController.googleLogin)

router.get('/logout', isAuth, authController.logout)

router.get('/me', isAuth, authController.me)

export default router;