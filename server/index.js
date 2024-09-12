import express from "express";
import cors from 'cors';
import helmet from 'helmet';
import { env } from './env.js';
import { apiRouter } from "./router/api.js";

const corsOptions = {
    credentials: true,
    origin: `http://localhost:${env.CLIENT_PORT}`,
};

const helmetOptions = {
    crossOriginResourcePolicy: false,
}

const app = express();

app.use(cors(corsOptions));
app.use(helmet(helmetOptions));

app.use('/api', apiRouter);

app.all('*', (req, res) => {
    return res.json({
        state: 'error',
        msg: 'Ne ten pataikei :P',
    });
});

app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(env.SERVER_PORT, () => {
    console.log(`Turizmo serveris: http://localhost:${env.SERVER_PORT}`);
});