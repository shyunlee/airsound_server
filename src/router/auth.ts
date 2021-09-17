import express from 'express'
import * as authController from '../controller/authController'

const router = express.Router()

router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.get('/logout', authController.logout)

export default router;