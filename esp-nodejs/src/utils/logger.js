export const logger = (message, type = 'info') => {
	const timestamp = new Date().toISOString();
	console.log(`[${timestamp}] [${type.toUpperCase()}] ${message}`);
};
