import { motion } from 'framer-motion';
import { useState } from 'react';
import { Header } from './components/header';
import { MeasurementsTable } from './components/measurements-table';
import { Pagination } from './components/pagination';
import { useFetchMeasurements } from './hooks/use-fetch-measurements';
import { useWebSocket } from './hooks/use-ws';

function App() {
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 10;
	const pollingInterval = 60000;

	const { temperature, humidity } = useWebSocket('ws://localhost:1337');

	const { measurements, totalPages } = useFetchMeasurements(
		currentPage,
		pageSize,
		pollingInterval
	);

	return (
		<main className='flex flex-col h-[100vh]'>
			<Header temperature={temperature} humidity={humidity} />
			<motion.section
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1, delay: 6, ease: 'linear' }}
				className='flex flex-col mt-5 p-8 overflow-auto gap-5'
			>
				<div className='flex items-center justify-between'>
					<h1 className='text-2xl font-bold text-blue-500'>
						Measurements History
					</h1>
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={setCurrentPage}
					/>
				</div>
				<MeasurementsTable measurements={measurements} />
			</motion.section>
		</main>
	);
}

export default App;
