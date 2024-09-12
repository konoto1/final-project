import { connection } from '../../db.js';
import express from "express";

export const locationsApiRouter = express.Router();

locationsApiRouter.get('/', getLocations);

async function getLocations(req, res) {
    // const data = [
    //     {
    //         img: '/',
    //         name: 'Menulis',
    //         address: {
    //             country: 'Kostmosas',
    //             city: 'A',
    //             street: 'A',
    //             number: 'A',
    //             zip: 'A',
    //         },
    //     },
    //     {
    //         img: '/',
    //         name: 'Gelyte',
    //         address: {
    //             country: 'Tundra',
    //             city: 'B',
    //             street: 'B',
    //             number: 'B',
    //             zip: 'B',
    //         },
    //     },
    //     {
    //         img: '/',
    //         name: 'Meduza',
    //         address: {
    //             country: 'Baltijos jura',
    //             city: 'C',
    //             street: 'C',
    //             number: 'C',
    //             zip: 'C',
    //         },
    //     },
    // ];

    const sql = 'SELECT * FROM locations INNER JOIN adress ON locations.id = adress.adress_id;';
    const dataFromServer = await connection.execute(sql);

    console.log(dataFromServer[0]);

    return res.json({
        state: 'success',
        data: dataFromServer[0],
    });
}


