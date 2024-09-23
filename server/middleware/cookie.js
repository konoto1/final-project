export function cookieParser(req, res, next) {
    if (!req.headers.cookie) {
        req.cookie = {};
    } else {
        req.cookies = req
            .headers
            .cookie
            .split(';')
            .map(s => s.trim().split('='))
            .reduce((total, item) => ({ ...total, [item[0]]: item[1] }, {}));


    }
    next();
}