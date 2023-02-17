import React, { useContext } from 'react';
import { MenuOptions } from './menu';
import { PaginationContext } from 'src/state/Contexts';
import { Link, useLocation } from 'react-router-dom';

const Menu = () => {
	const { setPagination } = useContext(PaginationContext);
	const { pathname } = useLocation();

	return (
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
							className={`text-sm pr-10 leading-5 first:pl-4 last:pr-4 font-roboto 
                        ${
													pathname.replace('/', '') === item.path &&
													'font-bold underline'
												} text-white `}
							data-testid={`button-${item.alias.toLowerCase()}`}
						>
							{item.alias}
						</li>
					</Link>
				))}
			</ul>
		</nav>
	);
};

export default Menu;
