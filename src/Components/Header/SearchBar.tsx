import React, { useState } from 'react';
import { searchType } from 'src/Types';
import { useFetch } from 'src/state/Hooks/useSWR';

export const SearchBar = () => {
	const [search, setSearch] = useState('');
	const [suggestionItens, setSuggest] = useState<string>('');

	return (
		<form>
			<input
				type="text"
				name="search--currency"
				placeholder="Search Currency or Exchange"
				value={search}
				aria-label="search"
				role="combobox"
				onChange={(e) => setSearch(e.target.value)}
				onBlur={(e) => {
					e.preventDefault();
					//search after focus
					setSuggest(e.target.value);
				}}
			/>
			<button type="submit">Search</button>
			{suggestionItens !== '' && <AutoComplete searchParam={suggestionItens} />}
		</form>
	);
};

export const AutoComplete = ({ searchParam }: { searchParam: string }) => {
	const { data, isLoading } = useFetch<searchType>(
		`search?query=${searchParam}`,
		'get'
	);
	if (!isLoading)
		return (
			<ul className="suggest--box" role="listbox" aria-autocomplete="list">
				{data &&
					data.coins.map((item) => {
						return (
							<li role="option" key={item.id} className="suggest--box__option">
								{item.name}
							</li>
						);
					})}
			</ul>
		);
	return <></>;
};
