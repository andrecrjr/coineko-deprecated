import { CurrencyList } from 'src/Types';
import Pagination from './Pagination';
import CurrencyTable from './CurrencyTable';

interface Props {
	data: CurrencyList;
}

const Table = ({ data }: Props) => {
	return (
		<section
			className="overflow-x-scroll 
				 sm:overflow-x-auto sm:w-12/12 mb-10"
		>
			<table className="bg-[#DEDEDE]  rounded-md table-auto w-full">
				<thead className="border-b-[2px] border-[#4d51bb]">
					<tr>
						<td className="table--head px-0 w-5 h-auto"></td>
						<td className="table--head px-3 text-left">#</td>
						<td className="table--head">Coin</td>
						<td className="table--head min-w-[80px]">Price</td>
						<td className="table--head min-w-[80px] text-center">1h</td>
						<td className="table--head min-w-[80px] text-center">24h</td>
						<td className="table--head min-w-[80px] text-center">7d</td>
						<td className="table--head min-w-[150px]">Market Cap.</td>
						<td className="table--head min-w-[150px] ">Last 7 days</td>
					</tr>
				</thead>
				<tbody>
					<CurrencyTable currencyList={data} />
				</tbody>
			</table>
			{data?.length >= 50 && <Pagination />}
		</section>
	);
};

export default Table;
