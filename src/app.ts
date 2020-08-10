import express from 'express';
import config from './config';
import startup from './startup';

const run = () => {
    const app = express();

    app.listen(config.port, (err) => {
        process.stdout.write(err);
        process.exit(1);
        return;
    });

    console.log(`Server listening on port: ${config.port}`);
};

run();
