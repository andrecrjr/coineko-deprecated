import { Header } from './Components/Header';
import { useState } from 'react';
import { Table } from './Components/Table';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { FilterGlobalContext, PaginationContext } from './Contexts';
import { PaginationState } from './Types';

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
						page: 1,
						price_change_percentage: '1h,24h,7d',
						category: 'cryptocurrency'
					}}
				>
					<div className="App">
						<Header />
						<Routes>
							<Route
								path="/"
								element={
									<Table description="Price of the main cryptocurrencies by Market Capitalization." />
								}
							/>
							<Route
								path="nft"
								element={
									<Table
										description="Ranking of NFT price by Market Capitalization."
										category={'non-fungible-tokens-nft'}
									/>
								}
							/>
							<Route
								path="de-fi"
								element={
									<Table
										description="Ranking of De-Fi prices by Market Capitalization."
										category={'decentralized-finance-defi'}
									/>
								}
							/>
							<Route
								path="exchange"
								element={
									<Table
										description="Price of cryptocurrencies exchange by Market Capitalization."
										category={'exchange-based-tokens'}
									/>
								}
							/>
						</Routes>
					</div>
				</FilterGlobalContext.Provider>
			</PaginationContext.Provider>
		</Router>
	);
}

export default App;
