import { createContext } from 'react';
import { PageCurrencyQuery, Pagination, PortfolioType } from 'src/Types';
import { storageObject } from 'src/utils';

export const PaginationContext = createContext<Pagination>({
	page: {
		number: 1,
		firstOrPagination: 'current'
	},
	setPagination: () => {
		return {
			number: 1,
			firstOrPagination: 'current'
		};
	}
});

export const FilterGlobalContext = createContext<PageCurrencyQuery>({
	vs_currency: 'usd',
	order: 'market_cap_desc',
	per_page: '50',
	page: '1',
	sparkline: 'false',
	price_change_percentage: '1h,24h,7d',
	category: 'cryptocurrency'
});

export const PortfolioContext = createContext<PortfolioType>({
	userCurrency: storageObject.get('portfolio') || [],
	setPortfolio: () => null
});
