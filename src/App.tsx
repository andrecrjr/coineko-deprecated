import { Header } from './Components/Header';
import { memo, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { FilterGlobalContext, PaginationContext } from './Contexts';
import { PaginationState } from './Types';
import TablePage from './Page';

function App() {
	const [page, setPagination] = useState<PaginationState>({
		firstOrPagination: 'current',
		number: 1
	});

	return (
		<Router>
			<PaginationContext.Provider value={{ page, setPagination }}>
				<FilterGlobalContext.Provider
					value={{
						vs_currency: 'usd',
						order: 'market_cap_desc',
						per_page: '50',
						sparkline: 'false',
						page: '1',
						price_change_percentage: '1h,24h,7d'
					}}
				>
					<AppRoutes />
				</FilterGlobalContext.Provider>
			</PaginationContext.Provider>
		</Router>
	);
}

export const AppRoutes = () => {
	return (
		<div className="App">
			<Header />
			<Routes>
				<Route
					path="/"
					element={
						<TablePage description="Price of the main cryptocurrencies by Market Capitalization." />
					}
				/>
				<Route
					path="nft"
					element={
						<TablePage
							description="Ranking of NFT price by Market Capitalization."
							category={'non-fungible-tokens-nft'}
						/>
					}
				/>
				<Route
					path="de-fi"
					element={
						<TablePage
							description="Ranking of De-Fi prices by Market Capitalization."
							category={'decentralized-finance-defi'}
						/>
					}
				/>
				<Route
					path="exchange"
					element={
						<TablePage
							description="Price of cryptocurrencies exchange by Market Capitalization."
							category={'exchange-based-tokens'}
						/>
					}
				/>
			</Routes>
		</div>
	);
};

export default memo(App);
