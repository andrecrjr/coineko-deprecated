import { useContext, useMemo, useState } from 'react';
import { PortfolioContext } from 'src/state/Contexts';

export const useGetPortfolio = () => {
	const { userCurrency } = useContext(PortfolioContext);
	const [portfolioFilter, sePortfolioFilter] = useState('');
	useMemo(() => {
		if (userCurrency) sePortfolioFilter(userCurrency?.join());
	}, [userCurrency]);

	return { portfolioFilter };
};
