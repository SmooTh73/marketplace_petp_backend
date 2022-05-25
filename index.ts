import express from 'express';
import config from './src/config/index';
import cors from 'cors';
import db from './src/db/index';

const app = express();

app.use(express.json());
app.use(cors());


app.listen(config.app.PORT, () => {
    try {
        db();
        console.log(`Server is running on ${config.app.PORT}`);
    } catch (error) {
        console.log(error);
    }
});

