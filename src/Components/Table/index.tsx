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
			<table className="bg-[#DEDEDE]  rounded-md table-auto w-full">
				<thead className="border-b-[2px] border-[#4d51bb]">
					<tr>
						<td className="table--head px-0 w-6 h-auto"></td>
						<td className="table--head px-3 text-left">#</td>
						<td className="table--head">Coin</td>
						<td className="table--head min-w-[80px]">Price</td>
						<td className="table--head min-w-[80px] text-center sm:text-left">
							1h
						</td>
						<td className="table--head min-w-[80px] text-center sm:text-left">
							24h
						</td>
						<td className="table--head min-w-[80px] text-center sm:text-left">
							7d
						</td>
						<td className="table--head min-w-[150px] sm:min-w-[130px]">
							Market Cap.
						</td>
						<td className="table--head min-w-[150px] sm:min-w-[100px]">
							Last 7 days
						</td>
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
