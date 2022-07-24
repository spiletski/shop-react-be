import { Client } from 'pg';

export const createConnection = async () => {
    const {
        PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD,
    } = process.env;
    const dbOptions = {
        host: PG_HOST,
        port: PG_PORT,
        database: PG_DATABASE,
        user: PG_USERNAME,
        password: PG_PASSWORD,
        ssl: {
            rejectUnauthorized: false,
        },
        connectionTimeoutMillis: 5000,
    };

    // @ts-ignore
    const client = new Client(dbOptions);
    await client.connect();

    return client;
};





