import currencyList from './currencyListApi.json';

export type PageCurrencyQuery = {
	vs_currency: string;
	order: string;
	per_page: string;
	page: number;
	sparkline: string;
	price_change_percentage: string;
	category?: string;
	query?: string;
};

export type Currency = typeof currencyList;

export type CurrencyList = Currency[];

export type PaginationState = {
	number: number;
	firstOrPagination: 'current' | 'pagination';
};

export type Pagination = {
	page: PaginationState;
	setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
};
