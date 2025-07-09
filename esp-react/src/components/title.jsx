import { motion } from 'framer-motion';

export const AnimatedTitle = ({ text, className }) => {
	const letters = text.split('');

	const container = {
		hidden: { opacity: 1 },
		visible: {
			transition: {
				staggerChildren: 0.2,
				delayChildren: 2,
			},
		},
	};

	const letter = {
		hidden: { opacity: 0, color: '#000' },
		visible: {
			opacity: 1,
			color: '#FF6347',
			transition: { duration: 0.05, ease: 'linear' },
		},
	};

	return (
		<motion.h1
			variants={container}
			initial='hidden'
			animate={'visible'}
			className={className}
		>
			{letters.map((char, index) => (
				<motion.span key={index} variants={letter}>
					{char}
				</motion.span>
			))}
		</motion.h1>
	);
};
