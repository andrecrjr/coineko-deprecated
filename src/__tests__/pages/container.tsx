import { useReducer, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { PaginationContext, PortfolioContext } from 'src/state/Contexts';
import { PortfolioReducer } from 'src/state/Reducers/portfolio';
import { PaginationState } from 'src/Types';
import { storageObject } from 'src/utils';

export const ContainerWrapper = ({ children }: { children: JSX.Element }) => {
	const [page, setPagination] = useState<PaginationState>({
		firstOrPagination: 'current',
		number: 1
	});
	const [portfolio, dispatchPortfolio] = useReducer(
		PortfolioReducer,
		storageObject.get<string[]>('portfolio')
	);

	return (
		<BrowserRouter>
			<PortfolioContext.Provider
				value={{
					userCurrency: portfolio,
					setPortfolio: dispatchPortfolio
				}}
			>
				<PaginationContext.Provider value={{ page, setPagination }}>
					{children}
				</PaginationContext.Provider>
			</PortfolioContext.Provider>
		</BrowserRouter>
	);
};
