import { createContext } from 'react';

export const PaginationContext = createContext<{
	page: number;
	setPagination: React.Dispatch<React.SetStateAction<number>>;
}>({
	page: 1,
	setPagination: () => {
		return 0;
	}
});

export const FilterGlobalContext = createContext({
	vs_currency: 'usd',
	order: 'market_cap_desc',
	per_page: '50',
	page: 1,
	sparkline: 'false',
	price_change_percentage: '1h,24h,7d'
});
