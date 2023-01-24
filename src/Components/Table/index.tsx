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
					<CurrencyTable currencyList={data} />
				</tbody>
			</table>
			<Pagination />
		</section>
	);
};

export default Table;
