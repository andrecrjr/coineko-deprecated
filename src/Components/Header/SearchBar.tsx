import { useEffect, useState } from 'react';
import { AutoComplete } from './Autocomplete';

export const SearchBar = () => {
	const [search, setSearch] = useState('');
	const [suggestionItens, setSuggest] = useState<string>('');
	useEffect(() => {
		if (suggestionItens) {
			setTimeout(() => {
				setSuggest('');
			}, 10000);
		}
	}, [suggestionItens]);

	return (
		<form className="relative">
			<input
				type="text"
				className="search--box"
				placeholder="Search Currency or Exchange"
				value={search}
				aria-label="search"
				role="combobox"
				onChange={(e) => setSearch(e.target.value)}
				onBlur={(e) => {
					e.preventDefault();
					setSuggest(e.target.value);
				}}
			/>
			<button type="submit" className="absolute top-0 right-0">
				Search
			</button>
			{suggestionItens !== '' && <AutoComplete searchParam={suggestionItens} />}
		</form>
	);
};
