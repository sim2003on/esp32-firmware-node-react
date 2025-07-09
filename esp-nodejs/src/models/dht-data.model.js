import mongoose from 'mongoose';

const DhtDataSchema = new mongoose.Schema(
	{
		temperature: { type: Number },
		humidity: { type: Number },
		createdAt: { type: Date, default: Date.now, expires: '7d' },
	},
	{ timestamps: true }
);

export const DhtDataModel = mongoose.model('DhtData', DhtDataSchema);
