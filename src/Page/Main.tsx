import React from 'react';
import { Outlet } from 'react-router';
import Header from 'src/Components/Header';

export const Main = () => {
	return (
		<>
			<div className="App">
				<Header />
				<section className="flex flex-col justify-center sm:items-center ml-2 sm:ml-0 relative">
					<Outlet />
				</section>
			</div>
		</>
	);
};
