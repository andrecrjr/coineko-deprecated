import { Link } from 'react-router-dom';
import { CurrencyItem, searchType } from 'src/Types';
import { useFetch } from 'src/state/Hooks/useSWR';
import { StarPortfolioCurrency } from '../Table/Star';

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
		<div className="grid grid-cols-[25px_auto_auto] my-8 sm:my-3 mx-5 items-center">
			<StarPortfolioCurrency currencyId={currency.id} />
			<img src={currency.thumb} className="ml-4" width="25" height="25" />
			<h3 className="text-sm break-before-auto overflow-hidden ml-4">
				{currency.name}
			</h3>
		</div>
	);
};
