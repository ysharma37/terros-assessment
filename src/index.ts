import express from 'express';
import { createServer } from 'http';
import { SocketService } from './services/socketService';

const app = express();
const port = process.env.PORT || 3000;
const server = createServer(app);

app.get('/', (req, res) => {
    res.send('Chess Game Server is running');
});

const socketService = new SocketService(server);

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
