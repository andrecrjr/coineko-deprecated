import { FormEvent, useEffect, useState } from 'react';
import { AutoComplete } from './Autocomplete';
import { MdSearch } from 'react-icons/md';

export const SearchBar = () => {
	const [search, setSearch] = useState('');
	const [suggestionItens, setSuggest] = useState<string>('');
	useEffect(() => {
		if (suggestionItens.length > 0) {
			setTimeout(() => {
				setSuggest('');
			}, 10000);
		}
	}, [suggestionItens]);

	const updateSuggestion = (
		e: FormEvent<HTMLInputElement | HTMLFormElement>
	) => {
		e.preventDefault();
		setSuggest(search);
	};

	return (
		<form className="relative w-full" onSubmit={updateSuggestion}>
			<input
				type="text"
				className="search--box"
				placeholder="Search Currency or Exchange"
				value={search}
				aria-label="search"
				role="combobox"
				onChange={(e) => setSearch(e.target.value)}
				onBlur={updateSuggestion}
			/>
			<button type="submit" className="absolute top-0 right-0">
				<MdSearch width="30" height="30" />
			</button>
			{suggestionItens !== '' && <AutoComplete searchParam={suggestionItens} />}
		</form>
	);
};
