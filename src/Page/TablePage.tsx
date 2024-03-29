import { useContext } from 'react';
import Table from 'src/Components/Table';
import { FilterGlobalContext, PaginationContext } from 'src/state/Contexts';
import { useFilter } from 'src/state/Hooks/useFilter';
import { useFetch } from 'src/state/Hooks/useSWR';
import { CurrencyList } from 'src/Types';
import Cat from 'src/assets/cat.svg?component';

type Props = {
	description: string;
	category?: string;
};

const TablePage = ({ description, category }: Props) => {
	const filterContext = useContext(FilterGlobalContext);

	const { page } = useContext(PaginationContext);
	const filterFetchData = useFilter({
		filterDataObject: {
			...filterContext,
			...{ page: page.number.toString() || '1', category }
		}
	});

	const { data: cryptoCurrenciesList, isLoading } = useFetch<CurrencyList>(
		filterFetchData,
		'GET'
	);

	return (
		<>
			<section className="flex items-center mt-8 w-10/12 mb-2 md:mb-5 md:mt-10 ">
				<span>
					<Cat className="w-[35px] h-[35px]" />
				</span>
				<h3 className="text-xs text-left items-start md:text-base">
					{description}
				</h3>
			</section>
			{!isLoading && <Table data={cryptoCurrenciesList} />}
		</>
	);
};

export default TablePage;
