import { connection } from '../../db.js';
import express from "express";
import { isValidPassword, isValidUsername } from '../../lib/isValid.js';

export const registerApiRouter = express.Router();

registerApiRouter.post('/', postRegister);

registerApiRouter.use((req, res) => {
    return res.json({
        state: 'error',
        data: "Toks HTML metodas nenaudojamas",
    });
});

async function postRegister(req, res) {

    if (typeof req.body !== 'object'
        || Array.isArray(req.body)
        || req.body === null
    ) {
        return res.json({
            status: 'error',
            data: 'Pagrindinis duomenu tipas turi buti objektas',
        });
    }

    const requiredFields = ['username', 'password'];

    if (Object.keys(req.body).length !== requiredFields.length) {
        return res.json({
            status: 'error',
            data: `Objekte turi buti tik ${requiredFields.length} raktai: ${requiredFields.join(', ')}`,
        });
    }

    const { username, password } = req.body;

    const usernameError = isValidUsername(username);
    if (usernameError) {
        return res.json({
            status: 'error',
            data: usernameError,
        });
    }

    const passwordError = isValidPassword(password);
    if (passwordError) {
        return res.json({
            status: 'error',
            data: passwordError,
        });
    }

    try {
        const sql = 'INSERT INTO users (username, password) VALUES (?, ?);';
        const result = await connection.execute(sql, [username, password]);

        if (result[0].affectedRows !== 1) {
            return res.json({
                status: 'error',
                data: 'Uzregistruoti nepavyko, nes toks vartotojas jau yra',
            });
        }

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
