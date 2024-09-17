import { connection } from '../../db.js';
import express from "express";

export const registerApiRouter = express.Router();

registerApiRouter.post('/', postRegister);
registerApiRouter.use((req, res) => {
    return res.json({
        state: 'error',
        data: "Toks HTML metodas nenaudojamas",
    });
});

async function postRegister(req, res) {

    console.log(req.body);
    const { username, password } = req.body;

    try {
        const sql = 'INSERT INTO users (username, password) VALUES (?, ?);';
        const result = await connection.execute(sql, [username, password]);
    } catch (error) {
        return res.json({
            state: 'error',
            data: 'Del techniniu kliuciu nepavyko ivykdyti regostracijos',
        });
    }

    return res.json({
        status: 'success',
        data: 'Registracija buvo sekminga',
    });
}
