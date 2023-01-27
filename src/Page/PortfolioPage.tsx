import React from 'react';
import Table from 'src/Components/Table';
import { CurrencyList } from 'src/Types';

import { useGetPortfolio } from 'src/state/Hooks/usePortfolio';
import { useFetch } from 'src/state/Hooks/useSWR';

export const PortfolioPage = () => {
	const { portfolioFilterQuery, portfolioItens } = useGetPortfolio();
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
		<>
			<section className="flex items-center mt-8 w-10/12 mb-2 md:mb-5 md:mt-10 ">
				<h3 className="text-xs text-left items-start md:text-base">
					Your Portfolio
				</h3>
			</section>
			{!isLoading &&
				data &&
				data.length > 0 &&
				portfolioItens &&
				portfolioItens?.length > 0 && <Table data={data} />}
			<NotLoaded />
		</>
	);
};
