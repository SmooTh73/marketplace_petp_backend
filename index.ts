import express from 'express';
import config from './src/config/index';
import cors from 'cors';

import errorHandler from './src/errors/error-handler';

const app = express();

app.use(express.json());
app.use(cors());


app.listen(config.app.PORT, () => {
    console.log(`Server is running on ${config.app.PORT}`);
});

app.use(errorHandler);

