import React from 'react';
import Table from 'src/Components/Table';
import { CurrencyList } from 'src/Types';

import { useGetPortfolio } from 'src/state/Hooks/usePortfolio';
import { useFetch } from 'src/state/Hooks/useSWR';

export const PortfolioPage = () => {
	const { portfolioFilterQuery } = useGetPortfolio();
	const { data, isLoading } = useFetch<CurrencyList>(
		portfolioFilterQuery,
		'get'
	);

	const NotLoaded = () => {
		if (!isLoading && !data) {
			return <p>Not found any cryptocurrency in your browser</p>;
		}
		return <></>;
	};

	return (
		<section>
			<h2>Your Portfolio</h2>
			{!isLoading && data && data.length > 0 && <Table data={data} />}
			<NotLoaded />
		</section>
	);
};
