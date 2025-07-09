import { WebSocket, WebSocketServer } from 'ws';
import TeleBot from '../bot.js';
import { saveSensorData } from './database.service.js';

let clients = [];

const chatId = process.env.CHAT_ID;

const notifyInterval = 60 * 1000;
let lastNotificationTime = 0;

export const createWebSocketServer = port => {
	const wss = new WebSocketServer({ port });

	wss.on('connection', ws => {
		console.log('Client connected');
		clients.push(ws);

		let lastSaveTime = 0;
		const saveInterval = 15 * 60 * 1000;

		ws.on('message', async message => {
			try {
				const data = JSON.parse(message);
				console.log('Received message: ', data);

				if (data.temperature && data.humidity) {
					clients.forEach(client => {
						if (client.readyState === WebSocket.OPEN) {
							client.send(JSON.stringify(data));
						}
					});

					if (Date.now() - lastSaveTime >= saveInterval) {
						await saveSensorData(data);
						lastSaveTime = Date.now();
						console.log('Data saved to database');
					}
				}

				if (
					(data.temperature && data.temperature > 40) ||
					(data.humidity && data.humidity > 50)
				) {
					const currentTime = Date.now();
					if (currentTime - lastNotificationTime >= notifyInterval) {
						TeleBot.sendMessage(
							chatId,
							`⚠️Warning⚠️ \nTemperature or Humidity is exceeding the limits of indicators: temperature=${
								data.temperature
							} °C, humidity=${
								data.humidity
							} %, at ${new Date().toLocaleString()}`
						);
						lastNotificationTime = currentTime;
					}
				}
			} catch (error) {
				console.error('Error processing WebSocket message:', error);
			}
		});

		ws.on('close', () => {
			clients = clients.filter(client => client !== ws);
			console.log('Client disconnected');
		});
	});

	console.log(`WebSocket server is running on port ${port}`);
};
