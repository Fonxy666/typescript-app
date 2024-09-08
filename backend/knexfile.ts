import { Knex } from "knex";
import * as dotenv from "dotenv";

dotenv.config();

const config: { [key: string]: Knex.Config } = {
    development: {
        client: 'mysql2',
        connection: {
            host: process.env.KNEX_HOST,
            user: process.env.KNEX_USER,
            password: process.env.KNEX_PASSWORD,
            database: process.env.KNEX_DATABASE
        },
        migrations: {
            directory: './src/migrations'
        }
    },
};

export default config;