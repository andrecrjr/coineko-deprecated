import React, { useContext } from 'react';
import { MdArrowForwardIos, MdArrowBackIos } from 'react-icons/md';
import { PaginationContext } from 'src/state/Contexts';

function Pagination() {
	const { page, setPagination } = useContext(PaginationContext);
	const paginationMove = (e: React.MouseEvent, next: boolean) => {
		e.preventDefault();
		if (next) {
			setPagination((oldPage) => {
				return {
					...page,
					number: oldPage.number + 1,
					firstOrPagination: 'pagination'
				};
			});
		} else {
			setPagination((oldPage) => {
				return {
					...page,
					number: oldPage.number - 1,
					firstOrPagination: 'pagination'
				};
			});
		}
		window.scrollTo(0, 0);
	};

	return (
		<div className="w-full flex justify-center mt-2 space-x-10">
			{page.number > 1 ? (
				<MdArrowBackIos
					className="fill-purple-neko cursor-pointer  w-10 text-xl"
					data-testid="previous-button"
					role={'button'}
					onClick={(e) => paginationMove(e, false)}
				/>
			) : (
				''
			)}
			<span>Page {page.number}</span>

			<MdArrowForwardIos
				className="fill-purple-neko  cursor-pointer  w-10 text-xl"
				data-testid="next-button"
				role="button"
				onClick={(e) => paginationMove(e, true)}
			/>
		</div>
	);
}

export default Pagination;
