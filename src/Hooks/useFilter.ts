import React, { FC, useCallback, useEffect, useState } from 'react';
import { PageCurrencyQuery } from 'src/Types';

export const useFilter = ({
	filterDataObject
}: {
	filterDataObject: PageCurrencyQuery;
}) => {
	const [filter, setFilter] = useState<string>(
		'?vs_currency=usd&order=market_cap_desc&per_page=50&sparkline=false&page=1&price_change_percentage=1h%2C24h%2C7d'
	);

	const fetchServiceByFilterAndUpdateData = useCallback(
		async (filterPaginationAndCategory) => {
			// console.log(filterPaginationAndCategory);
			const filterResult = new URLSearchParams({
				...filterPaginationAndCategory
			}).toString();
			setFilter(`?${filterResult}` || '');
		},
		[filterDataObject]
	);

	useEffect(() => {
		console.log(filterDataObject);
		fetchServiceByFilterAndUpdateData(filterDataObject);

		return () => {
			fetchServiceByFilterAndUpdateData('');
		};
	}, [filterDataObject]);

	return filter;
};
