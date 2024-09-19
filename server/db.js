import mysql from 'mysql2/promise';

export let connection = null;
const dbOptions = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'final_project',
};

try {
    connection = await mysql.createConnection(dbOptions);

} catch (error) {

    console.log('Neapvyko prisijungti prie DB programos gal pamirsai isijungti XAMMP?');
}

setInterval(async () => {
    if (connection?.connection?._fatalError !== null) {
        try {
            connection = await mysql.createConnection(dbOptions);

        } catch (error) {

            console.log('Neapvyko prisijungti prie DB programos gal pamirsai isijungti XAMMP?');
        }
    } else {
        // console.log('connection: OK');
    }

}, 10000);
