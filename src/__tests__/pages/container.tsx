import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { PaginationContext } from 'src/state/Contexts';
import { PaginationState } from 'src/Types';

export const ContainerWrapper = ({ children }: { children: JSX.Element }) => {
	const [page, setPagination] = useState<PaginationState>({
		firstOrPagination: 'current',
		number: 1
	});

	return (
		<BrowserRouter>
			<PaginationContext.Provider value={{ page, setPagination }}>
				{children}
			</PaginationContext.Provider>
		</BrowserRouter>
	);
};
