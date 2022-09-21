const styleCurrency = {
	style: 'currency',
	currency: 'USD',
};

export const formatterMoney = (
	language = 'en-US',
	currency: typeof styleCurrency,
	amount: number
) => {
	return new Intl.NumberFormat(language, currency).format(amount);
};
