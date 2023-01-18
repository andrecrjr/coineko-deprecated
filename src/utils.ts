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
