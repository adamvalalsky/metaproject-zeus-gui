import { darken, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeadCell } from './types.ts';

type BasicTableProps<T> = {
	rows: T[];
	head: HeadCell<T>[];
	isRowClickable: boolean;
};

const BasicTable = <T extends { id: number }>({ head, rows, isRowClickable }: BasicTableProps<T>) => {
	const navigate = useNavigate();

	return (
		<TableContainer component={Paper} sx={{ mt: 3 }}>
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
						<TableRow
							onClick={isRowClickable ? () => navigate(`${row.id}`) : undefined}
							key={index}
							sx={
								isRowClickable
									? { cursor: 'pointer', '&:hover': { backgroundColor: darken('#fff', 0.03) } }
									: {}
							}
						>
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
