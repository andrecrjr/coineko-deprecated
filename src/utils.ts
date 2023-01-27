import { PageCurrencyQuery } from './Types';

const styleCurrency = {
	style: 'currency',
	currency: 'USD'
};

export const formatterMoney = (
	language = 'en-US',
	currency: typeof styleCurrency,
	amount: number
) => {
	return new Intl.NumberFormat(language, currency).format(amount);
};

export const convertFilterQueryString = (
	filterPaginationAndCategory: PageCurrencyQuery
) => {
	if (typeof filterPaginationAndCategory?.category === 'undefined') {
		delete filterPaginationAndCategory['category'];
	}
	const filterResult = new URLSearchParams(
		filterPaginationAndCategory
	).toString();
	return filterResult;
};

export const storageObject = {
	get: <T>(storageKey: string): T => {
		const data = localStorage.getItem(storageKey) || JSON.stringify([]);
		return JSON.parse(data);
	},
	set: (storageKey: string, setData: string[]): boolean => {
		if (!setData) throw new Error('No data to set in localstorage');
		localStorage.setItem(storageKey, JSON.stringify(setData));
		return true;
	}
};

export const addToPortfolio = (newData: string | null) => {
	const portfolioData = storageObject.get<[]>('portfolio');
	if (newData) {
		return [...portfolioData, newData];
	}
	return [...portfolioData];
};
