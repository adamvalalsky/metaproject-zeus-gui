import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { ReactNode } from 'react';
import { HeadCell } from './types.ts';

type BasicTableProps<T> = {
	rows: T[];
	head: HeadCell<T>[];
};

const BasicTable = <T,>({ head, rows }: BasicTableProps<T>) => {
	return (
		<TableContainer component={Paper} sx={{ maxWidth: '60%', mt: 3 }}>
			<Table aria-label="simple table">
				<TableHead>
					<TableRow>
						{head.map((h, index) => (
							<TableCell align="left" key={index}>
								{h.displayName}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row, index) => (
						<TableRow key={index}>
							{head.map((key, columnIndex) => (
								<TableCell
									align="left"
									key={`${index}-${columnIndex}`}
									sx={{ overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 100 }}
								>
									{row[key.selector] as ReactNode}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default BasicTable;
