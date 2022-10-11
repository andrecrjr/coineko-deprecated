import currencyList from './currencyListApi.json';

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
