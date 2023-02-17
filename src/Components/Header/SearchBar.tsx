import { FormEvent, useEffect, useState } from 'react';
import { AutoComplete } from './Autocomplete';
import { MdClear, MdClearAll, MdSearch } from 'react-icons/md';

export const SearchBar = () => {
	const [search, setSearch] = useState('');
	const [suggestionItens, setSuggest] = useState<string>('');
	useEffect(() => {
		let timeout: NodeJS.Timeout;
		if (suggestionItens.length > 0) {
			timeout = setTimeout(() => {
				setSuggest('');
			}, 6000);
		}
		return () => {
			clearTimeout(timeout);
		};
	}, [suggestionItens]);

	const updateSuggestion = (
		e: FormEvent<HTMLInputElement | HTMLFormElement>
	) => {
		e.preventDefault();
		setSuggest(search);
	};

	return (
		<form
			className="search"
			role="search"
			aria-label="on this page"
			onSubmit={updateSuggestion}
		>
			<input
				type="text"
				className="search--box"
				placeholder="Search Currency or Exchange"
				value={search}
				aria-label="search"
				role="searchbox"
				onChange={(e) => setSearch(e.target.value)}
				onBlur={updateSuggestion}
			/>
			<button
				type="submit"
				role="button"
				className="absolute top-0 right-0 bottom-0 pr-5"
				tabIndex={1}
			>
				<MdSearch size={25} />
			</button>
			{suggestionItens !== '' && search !== '' && (
				<button
					className="absolute top-0 right-0 bottom-0 pr-20"
					role="button"
					tabIndex={2}
					aria-label="Clear search box"
					onClick={(e) => {
						e.preventDefault();
						setSearch('');
						setSuggest('');
					}}
				>
					<MdClear size={25} />
				</button>
			)}
			{suggestionItens !== '' && <AutoComplete searchParam={suggestionItens} />}
		</form>
	);
};
