import mongoose from 'mongoose';
import { DhtDataModel } from '../models/dht-data.model.js';

export const connectToDatabase = async DB_URL => {
	try {
		await mongoose.connect(DB_URL);
		console.log('Connected to MongoDB');
	} catch (error) {
		console.error('Error connecting to MongoDB:', error);
		throw error;
	}
};

export const saveSensorData = async data => {
	const sensorData = new DhtDataModel({
		temperature: data.temperature,
		humidity: data.humidity,
	});
	await sensorData.save();
};
