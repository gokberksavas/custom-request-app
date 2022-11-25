import express from 'express';
import cors from 'cors';
import { orderRouter, userRouter } from './routes';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'

dotenv.config();

const app = express();
const corsConfig = {
  origin: 'http://localhost:9000',
  credentials: true,
  methods: 'GET, POST, PUT, DELETE, OPTIONS'
}

app.use(cookieParser());
app.use(express.json());
app.use(cors(corsConfig));
app.use('/', orderRouter);
app.use('/user', userRouter);

app.listen(3000, () => {
    console.log('Server has started on port 3000');
});