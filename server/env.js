import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const e = process.env;

export const env = {
    SERVER_PORT: +e.SERVER_PORT ?? 7000,
    CLIENT_PORT: +e.CLIENT_PORT ?? 8000,
    COOKIE_MAX_AGE: +e.COOKIE_MAX_AGE ?? 86400,
};