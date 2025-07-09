import { motion } from 'framer-motion';
import tempIcon from '../assets/high-temperature-icon.svg';
import humidityIcon from '../assets/water-drop-icon.svg';
import { AnimatedTitle } from './title';

const DataDisplay = ({ icon, title, value, colorClass, delay }) => (
	<div className='flex items-center gap-2'>
		<motion.img
			initial={{ scale: 0 }}
			animate={{ scale: 1 }}
			transition={{ duration: 0.5, delay: 0.5, ease: 'linear' }}
			className='w-10 h-10'
			src={icon}
			alt={`${title} Icon`}
		/>
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5, delay: 1.5, ease: 'linear' }}
		>
			<p className='font-bold text-lg'>{title}</p>
			<span className={`text-xl ${colorClass}`}>{value}</span>
		</motion.div>
	</div>
);

export const Header = ({ temperature, humidity }) => {
	return (
		<motion.header
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 1, ease: 'linear' }}
			className='p-4 bg-gray-200 top-0 left-0 w-full flex items-center shadow-md relative'
		>
			<div className='flex gap-4 items-center'>
				<DataDisplay
					icon={tempIcon}
					title='Temperature'
					value={temperature !== null ? `${temperature} °C` : 'Loading...'}
					colorClass='text-red-600'
					delay={2}
				/>
				<DataDisplay
					icon={humidityIcon}
					title='Humidity'
					value={humidity !== null ? `${humidity} %` : 'Loading...'}
					colorClass='text-blue-600'
					delay={3}
				/>
			</div>
			<AnimatedTitle
				className='text-4xl font-bold absolute inset-0 flex justify-center items-center gap-3'
				text='DHT MONITORING SYSTEM'
			/>
		</motion.header>
	);
};
