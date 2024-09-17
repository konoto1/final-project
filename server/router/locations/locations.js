import { connection } from '../../db.js';
import express from "express";

export const locationsApiRouter = express.Router();

locationsApiRouter.get('/', getLocations);

async function getLocations(req, res) {

    const sql = 'SELECT * FROM locations INNER JOIN adress ON locations.adress_id = adress.adress_id;';
    let dataFromServer = [[]];

    try {
        dataFromServer = await connection.execute(sql);
    } catch (error) {

    }

    return res.json({
        state: 'success',
        data: dataFromServer[0],
    });
}


