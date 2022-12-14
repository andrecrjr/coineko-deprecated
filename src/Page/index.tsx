import React from 'react';
import { Header } from 'src/Components/Header';
import { Table } from 'src/Components/Table';

type Props = {
	description: string;
	category?: string;
};

const TablePage = (props: Props) => {
	return (
		<>
			<div className="App">
				<Header />
				<Table {...props} />
			</div>
		</>
	);
};

export default TablePage;
