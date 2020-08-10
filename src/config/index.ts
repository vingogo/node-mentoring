import { config } from 'dotenv';

const envFound = config();

if (envFound.error) {
    throw new Error("Couldn't find .env file");
}

export default {
    port: parseInt(process.env.PORT || '3000', 10)
};
