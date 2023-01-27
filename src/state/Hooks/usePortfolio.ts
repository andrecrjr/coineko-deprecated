import { useContext, useMemo, useState } from 'react';
import { PortfolioContext } from 'src/state/Contexts';

export const useGetPortfolio = () => {
	const { userCurrency } = useContext(PortfolioContext);

	const [portfolioFilter, sePortfolioFilter] = useState('');
	useMemo(() => {
		if (userCurrency)
			sePortfolioFilter(encodeURIComponent(userCurrency?.join()));
	}, [userCurrency]);

	return {
		portfolioFilterQuery:
			(userCurrency &&
				userCurrency?.length > 0 &&
				`coins/markets?vs_currency=usd&ids=${portfolioFilter}&order=market_cap_desc&per_page=100&page=1&sparkline=false`) ||
			'',
		portfolioItens: userCurrency
	};
};
