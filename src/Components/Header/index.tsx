import { MenuOptions } from './menu';
import Cat from '../../assets/cat.svg?component';
import { Link } from 'react-router-dom';
import { memo, useContext } from 'react';
import { PaginationContext } from 'src/state/Contexts';
import { SearchBar } from './SearchBar';
import Menu from './Menu';

const Header = () => {
	return (
		<header className="flex flex-col items-center">
			<section className="sm:ml-4 sm:py-2 flex w-10/12 justify-between flex-col sm:flex-row">
				<h1 className="text-4xl flex items-center" title="coineko">
					coineko
					<Cat className="inline self-center w-5 sm:w-10" />
				</h1>
				<SearchBar />
			</section>
			<Menu />
		</header>
	);
};

export default memo(Header);
