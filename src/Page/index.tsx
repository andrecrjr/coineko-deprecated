import React, { memo } from 'react';
import { Table } from 'src/Components/Table';

type Props = {
	description: string;
	category?: string;
};

const TablePage = (props: Props) => {
	return <Table {...props} />;
};

export default memo(TablePage);
