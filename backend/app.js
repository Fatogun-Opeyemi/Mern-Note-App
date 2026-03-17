import express from 'express';
import router from './Routes/routes.js';
import userRouter from './Routes/userRoutes.js';
import cors from 'cors';

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

app.use('/api/v1/books', router);
app.use('/api/v1/users', userRouter);

export default app;
