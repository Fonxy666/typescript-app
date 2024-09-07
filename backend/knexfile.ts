import { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
    development: {
        client: 'mysql2',
        connection: {
            host: 'localhost',
            user: 'root',
            password: 'asdASDasd123666',
            database: 'recipe-database'
        },
        migrations: {
            directory: './migrations'
        }
    },
};

export default config;