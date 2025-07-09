import { useEffect, useState } from 'react';

export const useWebSocket = url => {
	const [temperature, setTemperature] = useState(null);
	const [humidity, setHumidity] = useState(null);

	useEffect(() => {
		const ws = new WebSocket(url);

		ws.onopen = () => console.log('Connected to WebSocket server');
		ws.onmessage = event => {
			try {
				const data = JSON.parse(event.data);
				if (data.temperature !== undefined && data.humidity !== undefined) {
					setTemperature(data.temperature.toFixed(1));
					setHumidity(data.humidity.toFixed(1));
				}
			} catch (error) {
				console.error('Error parsing WebSocket message:', error);
			}
		};
		ws.onclose = () => console.log('WebSocket connection closed');
		ws.onerror = error => console.error('WebSocket error:', error);

		return () => ws.close();
	}, [url]);

	return { temperature, humidity };
};
