import express from 'express';
import config from './src/config/index';
import cors from 'cors';
import cookieParser from 'cookie-parser'

import errorHandler from './src/errors/error-handler';
import db from './src/db/index';
import apiRouter from './src/routes/index';

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser())

app.listen(config.app.PORT, async () => {
    try {
        await db();
    } catch (error) {
        throw error;
    }
    console.log(`Server is running on ${config.app.PORT}`);
});

app.use('/api', apiRouter);

app.use(errorHandler);

