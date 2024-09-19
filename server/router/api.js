import express from "express";
import { locationsApiRouter } from "./locations/locations.js";
import { registerApiRouter } from "./register/register.js";
import { loginApiRouter } from "./login/login.js";

export const apiRouter = express.Router();


apiRouter.use('/locations', locationsApiRouter);
apiRouter.use('/register', registerApiRouter);
apiRouter.use('/login', loginApiRouter);

apiRouter.all('/', (req, res) => {
    return res.json({
        state: 'error',
        msg: 'Issirink konkretu API endpoint\'a',
    });
});

