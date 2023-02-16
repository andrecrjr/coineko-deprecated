import { MenuOptions } from './menu';
import Cat from '../../assets/cat.svg?component';
import { Link } from 'react-router-dom';
import { memo, useContext } from 'react';
import { PaginationContext } from 'src/state/Contexts';
import { SearchBar } from './SearchBar';

const Header = () => {
	const { setPagination } = useContext(PaginationContext);
	return (
		<header className="flex flex-col items-center">
			<section className="sm:ml-4 sm:py-2 flex w-10/12 justify-between">
				<h1 className="text-4xl flex items-center" title="coineko">
					coineko
					<Cat className="inline self-center w-5 sm:w-10" />
				</h1>
				<SearchBar />
			</section>
			<nav
				className="w-full bg-purple-neko overflow-x-scroll 
			h-8 sm:h-10 flex content-center sm:justify-center sm:overflow-auto"
			>
				<ul className="list-none flex self-center ">
					{MenuOptions.map((item, index) => (
						<Link
							to={{
								pathname: item.path
							}}
							key={index}
							onClick={() => {
								setPagination((oldState) => ({
									...oldState,
									...{
										number: 1,
										firstOrPagination: 'current'
									}
								}));
							}}
						>
							<li
								className="text-sm pr-10 leading-5 first:pl-4 last:pr-4 font-roboto"
								data-testid={`button-${item.alias.toLowerCase()}`}
							>
								{item.alias}
							</li>
						</Link>
					))}
				</ul>
			</nav>
		</header>
	);
};

export default memo(Header);
