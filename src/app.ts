import { isMember } from './middleware/auth';
import express, { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser'
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { sequelize } from './db/database.js'
import authRouter from './router/auth'
import mediaRouter from './router/media'
import settingRouter from './router/setting'
import { config } from './config/config';

const app = express()

const corsOption = {
  origin: config.cors.allowOrigin,
  optionsSuccessStatus: 200,
  credentials: true,
}

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))
app.use(cors(corsOption))
app.use(helmet())
app.use(morgan('tiny'))

app.use('/auth', authRouter)
app.use('/media', isMember, mediaRouter)
app.use('/setting', settingRouter)

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((err:ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.sendStatus(500);
});

sequelize.sync().then(() => {
  app.listen(8080, () => {
    console.log('DB connected')
    console.log('server is on 8080')
  })
})
