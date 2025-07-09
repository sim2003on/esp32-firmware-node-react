import express from 'express';
import { getPaginatedSensorData } from '../services/dht.service.js';

const router = express.Router();

router.get('/dht-data', async (req, res) => {
	try {
		const page = parseInt(req.query.page, 10) || 1;
		const size = parseInt(req.query.size, 10) || 10;

		const { measurements, totalPages } = await getPaginatedSensorData(
			page,
			size
		);

		res.status(200).json({ measurements, totalPages });
	} catch (error) {
		console.error('Error fetching sensor data:', error);
		res.status(500).json({ error: 'Failed to fetch sensor data' });
	}
});

export default router;
