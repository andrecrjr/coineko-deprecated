import { Link } from 'react-router-dom';
import { CurrencyItem, searchType } from 'src/Types';
import { useFetch } from 'src/state/Hooks/useSWR';
import { StarPortfolioCurrency } from '../Table/CurrencyTable';

export const AutoComplete = ({ searchParam }: { searchParam: string }) => {
	const { data, isLoading } = useFetch<searchType>(
		`search?query=${searchParam}`,
		'get'
	);
	if (!isLoading)
		return (
			<ul className="suggest--box" role="listbox" aria-autocomplete="list">
				{data &&
					data.coins.map((item: CurrencyItem) => {
						return (
							<li role="option" key={item.id} className="suggest--box__option">
								<AutoCompleteItem currency={item} />
							</li>
						);
					})}
			</ul>
		);
	return <></>;
};

const AutoCompleteItem = ({ currency }: { currency: CurrencyItem }) => {
	return (
		<div className="flex">
			<StarPortfolioCurrency currencyId={currency.id} />
			<h3>{currency.name}</h3>
		</div>
	);
};
