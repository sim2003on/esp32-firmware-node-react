import { useEffect, useState } from 'react';

export const useFetchMeasurements = (
	currentPage,
	pageSize,
	pollingInterval
) => {
	const [measurements, setMeasurements] = useState([]);
	const [totalPages, setTotalPages] = useState(1);

	const fetchMeasurements = async page => {
		try {
			const response = await fetch(
				`http://localhost:8080/api/dht-data?page=${page}&size=${pageSize}`
			);
			const data = await response.json();
			setMeasurements(data.measurements);
			setTotalPages(data.totalPages);
		} catch (error) {
			console.error('Error fetching measurements:', error);
		}
	};

	useEffect(() => {
		fetchMeasurements(currentPage);
		const intervalId = setInterval(
			() => fetchMeasurements(currentPage),
			pollingInterval
		);
		return () => clearInterval(intervalId);
	}, [currentPage, pollingInterval]);

	return { measurements, totalPages };
};
