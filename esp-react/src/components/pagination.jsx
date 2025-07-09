export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
	return (
		<div className='flex justify-center mt-4'>
			<button
				disabled={currentPage === 1}
				className='px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300'
				onClick={() => onPageChange(currentPage - 1)}
			>
				Previous
			</button>
			<span className='mx-4 text-lg'>{`${currentPage} / ${totalPages}`}</span>
			<button
				disabled={currentPage === totalPages}
				className='px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300'
				onClick={() => onPageChange(currentPage + 1)}
			>
				Next
			</button>
		</div>
	);
};
