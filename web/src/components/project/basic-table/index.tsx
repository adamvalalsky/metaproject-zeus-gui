import { type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table } from '@mantine/core';

import { type HeadCell } from '@/components/project/basic-table/types';

import classes from './basic-table.module.css';

type BasicTableProps<T> = {
	rows: T[];
	head: HeadCell<T>[];
	isRowClickable: boolean;
};

const BasicTable = <T extends { id: number }>({ head, rows, isRowClickable }: BasicTableProps<T>) => {
	const navigate = useNavigate();

	return (
		<Table striped highlightOnHover withTableBorder>
			<Table.Thead>
				<Table.Tr>
					{head.map(h => (
						<Table.Th key={h.displayName}>{h.displayName}</Table.Th>
					))}
				</Table.Tr>
			</Table.Thead>
			<Table.Tbody className={classes.tableBody} data-clickable={isRowClickable}>
				{rows.map(row => (
					<Table.Tr onClick={isRowClickable ? () => navigate(`${row.id}`) : undefined} key={row.id}>
						{head.map(key => (
							<Table.Td key={`${row.id}-${key.displayName}`}>{row[key.selector] as ReactNode}</Table.Td>
						))}
					</Table.Tr>
				))}
			</Table.Tbody>
		</Table>
	);
};

export default BasicTable;
