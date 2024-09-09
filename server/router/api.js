import express from "express";

export const apiRouter = express.Router();


apiRouter.all('/', (req, res) => {
    return res.json({
        state: 'error',
        msg: 'Issirink konkretu API endpoint\'a',
    });
});
