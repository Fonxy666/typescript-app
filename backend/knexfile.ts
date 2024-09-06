import { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
    development: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: 'root',
            password: 'asdASDasd123666',
            database: 'recipe-database'
        }
    },
};

export default config;