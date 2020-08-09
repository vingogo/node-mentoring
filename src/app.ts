import { createServer, RequestListener } from 'http';
import { config } from 'dotenv';

config();

const PORT = process.env.PORT;
const server = createServer();

const onRequest: RequestListener = (req, res) => {
    res.end('Hello world!');
};

server.on('request', onRequest);

server.listen(PORT);
process.stdout.write(`Server running on port ${PORT}`);
