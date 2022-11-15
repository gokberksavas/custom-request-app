import express from 'express';
import cors from 'cors';
import { orderRouter, userRouter } from './routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/', orderRouter);
app.use('/user', userRouter);

app.listen(3000, () => {
    console.log('Example listening on port:3000');
});