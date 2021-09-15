import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express()

app.use(express.json());
app.use(cors())
app.use(helmet())
app.use(morgan('tiny'))


app.listen(8080, () => {
  console.log('server is on 8080')
})