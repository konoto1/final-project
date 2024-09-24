import { connection } from '../../db.js';
import express from "express";
import { env } from '../../env.js';

const tokenLength = 20;
export const logoutApiRouter = express.Router();


logoutApiRouter.get('/', getLogout);

logoutApiRouter.use((req, res) => {
    return res.json({
        state: 'error',
        data: "Toks HTML metodas nenaudojamas",
    });
});


async function getLogout(req, res) {
    if (!req.cookies.loginToken) {
        return res.json({
            status: 'error',
            msg: 'Atjungtu/neegzistuojanciu (sesiju) neatjunginejame',
        })
    }

    try {
        const sql = 'DELETE FROM tokens WHERE token = ?;';
        const result = await connection.execute(sql, [req.cookies.loginToken]);

        if (result[0].affectedRows !== 1) {
            return res.json({
                status: 'error',
                msg: 'Nepavyko sukurti vartotojo sesijos, pabandykite veliau',
            });
        }

    } catch (error) {
        return res.json({
            state: 'error',
            msg: 'Del techniniu kliuciu nepavyko ivykdyti atsijungimo proceso, bandykite veliau',
        });
    }

    const cookie = [
        'loginToken=' + req.cookies.loginToken,
        'domain=localhost',
        'path=/',
        'max-age=-1',
        'SameSite=Lax',
        'HttpOnly',
    ];

    return res
        .set('Set-Cookie', cookie.join('; '))
        .json({
            status: 'success',
            msg: 'Buvo sekmingai atsijungta',
        });
}
