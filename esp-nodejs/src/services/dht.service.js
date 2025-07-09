import { DhtDataModel } from '../models/dht-data.model.js';

export async function getPaginatedSensorData(page, size) {
	try {
		const skip = (page - 1) * size;
		const totalRecords = await DhtDataModel.countDocuments();
		const totalPages = Math.ceil(totalRecords / size);

		const measurements = await DhtDataModel.find()
			.sort({ timestamp: -1 })
			.skip(skip)
			.limit(size);

		return { measurements, totalPages };
	} catch (error) {
		console.error('Error fetching paginated data:', error);
		throw error;
	}
}
