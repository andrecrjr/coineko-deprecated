import React from 'react';
import Table from 'src/Components/Table';
import { CurrencyList } from 'src/Types';

import { useGetPortfolio } from 'src/state/Hooks/usePortfolio';
import { useFetch } from 'src/state/Hooks/useSWR';

export const PortfolioPage = () => {
	const { portfolioFilter } = useGetPortfolio();
	const { data, isLoading } = useFetch<CurrencyList>(
		`?vs_currency=usd&ids=${portfolioFilter}&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
		'get'
	);
	return (
		<section>
			<h2>Your Portfolio</h2>
			{!isLoading && <Table data={data} />}
		</section>
	);
};
