import dotenv from 'dotenv';
import app from './app.js';
import { createWebSocketServer } from './services/websocket.service.js';

dotenv.config();

const HTTP_PORT = process.env.HTTP_PORT || 8080;
const WS_PORT = process.env.WS_PORT || 1337;

app.listen(HTTP_PORT, () => {
	console.log(`HTTP server listening on port ${HTTP_PORT}!`);
});

createWebSocketServer(WS_PORT);
