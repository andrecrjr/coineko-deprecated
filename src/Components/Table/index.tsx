import { useCallback, useContext, useEffect, useState } from 'react';
import Cat from 'src/assets/cat.svg?component';
import { axiosInstance } from 'src/Services/ApiService';
import { CurrencyList } from 'src/Types';
import Pagination from './Pagination';
import { FilterGlobalContext, PaginationContext } from 'src/Contexts';
import CurrencyTable from './CurrencyTable';

interface Props {
	description: string;
	category?: string;
}

export const Table = ({ description, category }: Props) => {
	const filter = useContext(FilterGlobalContext);
	const [currencyList, setList] = useState<CurrencyList>([]);
	const { page } = useContext(PaginationContext);

	const fetchServiceByFilterAndUpdateData = useCallback(
		async (filterPaginationAndCategory) => {
			let result;
			if (filter)
				if (filterPaginationAndCategory) {
					result = new URLSearchParams({
						...filter,
						...filterPaginationAndCategory,
						...{ category: (!!category && category) || filter.category }
					}).toString();
				}
			const { data } = await axiosInstance.get(
				`/coins/markets?${result ? result : ''}`
			);
			setList(data);
		},
		[filter, category]
	);

	useEffect(() => {
		fetchServiceByFilterAndUpdateData({
			...{
				page: page.number
			}
		});
	}, [page, filter, category]);

	return (
		<section className="flex flex-col justify-center sm:items-center ml-2 sm:ml-0 relative">
			<section className="flex items-center mt-8 w-10/12 mb-2 md:mb-5 md:mt-10 ">
				<span>
					<Cat className="w-[35px] h-[35px]" />
				</span>
				<h3 className="text-xs text-left items-start md:text-base">
					{description}
				</h3>
			</section>
			<section
				className="overflow-x-scroll 
				 sm:overflow-x-auto sm:w-10/12 mb-10"
			>
				<table className="bg-[#DEDEDE]  rounded-md table-auto w-full min-h-screen">
					<thead className="border-b-[2px] border-[#4d51bb]">
						<tr>
							<td className="table--head px-0 w-5 h-auto"></td>
							<td className="table--head px-3 text-left">#</td>
							<td className="table--head pl-[32px]">Coin</td>
							<td className="table--head min-w-[170px]">Price</td>
							<td className="table--head">1h</td>
							<td className="table--head">24h</td>
							<td className="table--head">7d</td>
							<td className="table--head">Market Cap.</td>
						</tr>
					</thead>
					<tbody className="min-h-screen">
						<CurrencyTable currencyList={currencyList} />
					</tbody>
				</table>
				<Pagination />
			</section>
		</section>
	);
};
