import express from 'express'
import * as settingController from '../controller/settingController'
import { isAuth } from '../middleware/auth';

const router = express.Router()

router.post('/', isAuth, settingController.editUserInfo)


export default router;