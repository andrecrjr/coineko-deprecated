import { useCallback, useEffect, useState } from 'react';
import { PageCurrencyQuery } from 'src/Types';
import { convertFilterQueryString } from 'src/utils';

export const useFilter = ({
	filterDataObject
}: {
	filterDataObject: PageCurrencyQuery;
}) => {
	const [filter, setFilter] = useState<string>(
		'?vs_currency=usd&order=market_cap_desc&per_page=50&sparkline=false&page=1&price_change_percentage=1h%2C24h%2C7d'
	);
	const fetchServiceByFilterAndUpdateData = useCallback(
		async (filterPaginationAndCategory: PageCurrencyQuery) => {
			const queryStringFilter = convertFilterQueryString(
				filterPaginationAndCategory
			);
			console.log(queryStringFilter);
			setFilter(`?${queryStringFilter}` || '');
		},
		[filterDataObject]
	);

	useEffect(() => {
		fetchServiceByFilterAndUpdateData(filterDataObject);

		return () => {
			fetchServiceByFilterAndUpdateData(filterDataObject);
		};
	}, [filterDataObject]);

	return filter;
};
