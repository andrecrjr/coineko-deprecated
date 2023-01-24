import { useCallback, useEffect, useState } from 'react';
import { PageCurrencyQuery } from 'src/Types';
import { convertFilterQueryString } from 'src/utils';

export const useFilter = ({
	filterDataObject
}: {
	filterDataObject: PageCurrencyQuery;
}) => {
	const [filter, setFilter] = useState<string>('');
	const fetchServiceByFilterAndUpdateData = useCallback(
		async (filterPaginationAndCategory: PageCurrencyQuery) => {
			const queryStringFilter = convertFilterQueryString(
				filterPaginationAndCategory
			);
			setFilter(`coins/markets?${queryStringFilter}` || '');
		},
		[filterDataObject]
	);

	useEffect(() => {
		if (Object.keys(filterDataObject).length > 0)
			fetchServiceByFilterAndUpdateData(filterDataObject);
	}, [filterDataObject]);

	return filter;
};
