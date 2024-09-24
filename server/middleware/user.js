import { connection } from "../db.js";
import { env } from "../env.js";

const tokenLength = 20;

export async function userDetails(req, res, next) {
    req.user = {
        isLogedIn: false,
        role: 'public',
        username: '',
    };

    const { cookies } = req;

    if (typeof cookies.loginToken === 'string' && cookies.loginToken.length === tokenLength) {
        try {
            const sql = `
            SELECT 
                users.username, 
                tokens.created_at as tokens_created_at, 
                users.created_at as user_created_at
            FROM tokens 
            INNER JOIN users ON tokens.user_id = users.id
            WHERE tokens.token = ? AND tokens.created_at >= ?;`;
            const deadline = new Date(Date.now() - env.COOKIE_MAX_AGE * 1000);
            const [selectResult] = await connection.execute(sql, [cookies.loginToken, deadline]);

            if (selectResult.length === 1) {
                req.user.isLogedIn = true;
                req.user.role = 'user';
                req.user.username = selectResult[0].username;
            };

        } catch (error) {
            console.log(error);

        }
    }

    next();
}