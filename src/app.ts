import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { sequelize } from './db/database.js'
import authRouter from './router/auth'
import mediaRouter from './router/media'
import settingRouter from './router/setting'

const app = express()

app.use(express.json());
app.use(cors())
app.use(helmet())
app.use(morgan('tiny'))

app.use('/auth', authRouter)
app.use('/media', mediaRouter)
app.use('/setting', settingRouter)


sequelize.sync().then(() => {
  app.listen(8080, () => {
    console.log('DB connected')
    console.log('server is on 8080')
  })
})
