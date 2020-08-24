import { config } from 'dotenv';

const envFound = config();

if (envFound.error) {
    throw new Error("Couldn't find .env file");
}

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

export default {
    port: parseInt(process.env.PORT || '3000', 10),
    logLevel: process.env.LOG_LEVEL || 'silly',
    db: {
        username: process.env.db_username || 'postgres',
        password: process.env.db_pwd || 'postgres',
        database: process.env.db_name || 'usersDB',
        host: process.env.db_host || 'localhost'
    }
};
