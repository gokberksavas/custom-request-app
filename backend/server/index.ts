import express from 'express';
import cors from 'cors';
import { orderRouter, userRouter } from './routes';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use('/', orderRouter);
app.use('/user', userRouter);

app.listen(3000, () => {
    console.log('Server has started on port 3000');
});