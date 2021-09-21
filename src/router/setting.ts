import express from 'express'
import * as settingController from '../controller/settingController'

const router = express.Router()

router.post('/', settingController.editUserInfo)


export default router;