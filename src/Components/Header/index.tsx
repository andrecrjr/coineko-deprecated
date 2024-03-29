import Cat from '../../assets/cat.svg?component';
import { memo } from 'react';
import { SearchBar } from './SearchBar';
import Menu from './Menu';

const Header = () => {
	return (
		<header className="flex flex-col items-center">
			<section className="sm:ml-4 sm:py-2 flex w-10/12 justify-between flex-col sm:flex-row relative">
				<h1 className="text-4xl flex items-center" title="coineko">
					coineko
					<Cat className="inline self-center w-5 sm:w-10" />
				</h1>
				<p className="absolute text-xs bottom-0">
					All cryptocurrency data provided by{' '}
					<strong>
						<a
							href="http://coingecko.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							Coingecko
						</a>
					</strong>
				</p>
				<SearchBar />
			</section>
			<Menu />
		</header>
	);
};

export default memo(Header);
