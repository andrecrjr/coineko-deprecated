import React, { memo } from 'react';
import { Header } from 'src/Components/Header';
import { Table } from 'src/Components/Table';
export const TableMemoized = memo(Table);

type Props = {
	description: string;
	category?: string;
};

const TablePage = (props: Props) => {
	return <TableMemoized {...props} />;
};

export default TablePage;
