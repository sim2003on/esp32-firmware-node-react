import dayjs from 'dayjs';
import { CalendarDays, Droplet, Thermometer } from 'lucide-react';

export const MeasurementsTable = ({ measurements }) => {
	return (
		<table className='w-full border-collapse border border-gray-300'>
			<thead>
				<tr className='bg-gray-100'>
					<th className='border border-gray-300 px-4 py-2'>
						<span className='flex items-center justify-center gap-1'>
							<CalendarDays size={24} fill='yellow' />
							Date
						</span>
					</th>
					<th className='border border-gray-300 px-4 py-2'>
						<span className='flex items-center justify-center gap-1'>
							<Thermometer fill='red' size={24} />
							Temperature (°C)
						</span>
					</th>
					<th className='border border-gray-300 px-4 py-2'>
						<span className='flex items-center justify-center gap-1'>
							<Droplet color='blue' fill='blue' size={24} />
							Humidity (%)
						</span>
					</th>
				</tr>
			</thead>
			<tbody>
				{measurements.map((measurement, index) => (
					<tr key={index} className='even:bg-gray-50'>
						<td className='border border-gray-300 px-4 py-2 text-center'>
							{dayjs(measurement.createdAt).format('YYYY-MM-DD HH:mm:ss')}
						</td>
						<td className='border border-gray-300 px-4 py-2 text-center'>
							{measurement.temperature}
						</td>
						<td className='border border-gray-300 px-4 py-2 text-center'>
							{measurement.humidity}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
