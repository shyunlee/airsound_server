import express from 'express'
import * as mediaController from '../controller/mediaController'



const router = express.Router()

router.get('/all', mediaController.getAllMedia)

router.post('/savemood', mediaController.saveMood)

router.post('/editmood', mediaController.editMood)

router.delete('/:id', mediaController.deleteMood)


export default router;