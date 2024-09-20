import { connection } from '../../db.js';
import express from "express";
import { isValidPassword, isValidUsername } from '../../lib/isValid.js';

const tokenLength = 20;
export const loginApiRouter = express.Router();

loginApiRouter.post('/', postLogin);
loginApiRouter.get('/', getLogin);

loginApiRouter.use((req, res) => {
    return res.json({
        state: 'error',
        data: "Toks HTML metodas nenaudojamas",
    });
});

async function getLogin(req, res) {
    const cookies = req
        .headers
        .cookie
        .split(';')
        .map(s => s.trim().split('='))
        .reduce((total, item) => ({ ...total, [item[0]]: item[1] }), {});
    console.log(cookies);
    console.log(cookies.loginToken);


    return res.json({
        isLogedIn: true,
    });
}

async function postLogin(req, res) {

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
            msg: `Objekte turi buti tik ${requiredFields.length} raktai: ${requiredFields.join(', ')}`,
        });
    }

    const { username, password } = req.body;

    const usernameError = isValidUsername(username);
    if (usernameError) {
        return res.json({
            status: 'error',
            msg: usernameError,
        });
    }

    const passwordError = isValidPassword(password);
    if (passwordError) {
        return res.json({
            status: 'error',
            msg: passwordError,
        });
    }

    let userData = null;

    try {
        const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
        const result = await connection.execute(sql, [username, password]);

        if (result[0].length !== 1) {
            return res.json({
                status: 'error',
                msg: 'Prisijungti nepavyko, susisiekite su usser support',
            });
        }

        userData = result[0][0];

    } catch (error) {
        return res.json({
            status: 'error',
            msg: 'Del techniniu kliuciu prisijungti nepavyko, pabandykite veliau',
        })
    }

    const abc = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789';
    let token = '';

    for (let i = 0; i < tokenLength; i++) {
        token += abc[Math.floor(Math.random() * abc.length)];
    }

    try {
        const sql = 'INSERT INTO tokens (token, user_id) VALUES (?, ?);';
        const result = await connection.execute(sql, [token, userData.id]);

        if (result[0].affectedRows !== 1) {
            return res.json({
                status: 'error',
                msg: 'Nepavyko sukurti vartotojo sesijos, pabandykite veliau',
            });
        }

    } catch (error) {
        return res.json({
            state: 'error',
            msg: 'Del techniniu kliuciu nepavyko ivykdyti prisijungimo, bandykite veliau',
        });
    }

    const cookie = [
        'loginToken=' + token,
        'domain=localhost',
        'path=/',
        'max-age=3600',
        'SameSite=Lax',
        'HttpOnly',
    ];

    return res
        .set('Set-Cookie', cookie.join('; '))
        .json({
            status: 'success',
            msg: 'Buvo sekmingai prisijungta',
        });
}
