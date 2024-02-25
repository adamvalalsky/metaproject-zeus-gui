import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import { Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from '@mui/material';
import { getComparator } from './utils';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import EnhancedTableHead from './EnhancedTableHead';
import { Order } from './types.ts';
import { HeadCellSettings } from './EnhancedTableHead/types.ts';

type TableDefaultSettings<T> = {
	rows: T[];
	headCells: HeadCellSettings<T>[];
	initialOrder: Order;
	initialOrderBy: keyof T;
	isDense: boolean;
	canSelect: boolean;
	defaultRowsPerPage: number;
};

const EnhancedTable = <T extends { id: number }>({
	rows,
	headCells,
	initialOrder,
	initialOrderBy,
	isDense,
	canSelect,
	defaultRowsPerPage
}: TableDefaultSettings<T>) => {
	const [order, setOrder] = useState<Order>(initialOrder);
	const [orderBy, setOrderBy] = useState<keyof T>(initialOrderBy);
	const [selected, setSelected] = useState<readonly number[]>([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

	const handleRequestSort = (_event: React.MouseEvent<unknown>, property: keyof T) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			const newSelected = rows.map((n) => n.id);
			setSelected(newSelected);
			return;
		}
		setSelected([]);
	};

	const handleClick = (_event: React.MouseEvent<unknown>, id: number) => {
		const selectedIndex = selected.indexOf(id);
		let newSelected: readonly number[] = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}
		setSelected(newSelected);
	};

	const handleChangePage = (_event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const isSelected = (id: number) => selected.indexOf(id) !== -1;

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	// @ts-expect-error wrong comparator
	const visibleRows = useMemo(
		() => rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).sort(getComparator(order, orderBy)),
		[order, orderBy, page, rowsPerPage]
	);

	return (
		<Box sx={{ width: '100%' }}>
			<Paper sx={{ width: '100%', mb: 2 }}>
				{canSelect && <EnhancedTableToolbar numSelected={selected.length} />}
				<TableContainer>
					<Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={isDense ? 'small' : 'medium'}>
						<EnhancedTableHead
							headCells={headCells}
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							canSelect={canSelect}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={rows.length}
						/>
						<TableBody>
							{visibleRows.map((row, index) => {
								const isItemSelected = isSelected(row.id);
								const labelId = `enhanced-table-checkbox-${index}`;

								return (
									<TableRow
										hover
										onClick={(event) => handleClick(event, row.id)}
										role="checkbox"
										aria-checked={isItemSelected}
										tabIndex={-1}
										key={row.id}
										selected={isItemSelected}
										sx={{ cursor: 'pointer' }}
									>
										{canSelect && (
											<TableCell padding="checkbox">
												<Checkbox
													color="primary"
													checked={isItemSelected}
													inputProps={{
														'aria-labelledby': labelId
													}}
												/>
											</TableCell>
										)}
										{Object.keys(row).map((column) => (
											<TableCell
												sx={{
													maxWidth: 100,
													textOverflow: 'ellipsis ellipsis',
													overflow: 'hidden'
												}}
											>
												{row[column]}
											</TableCell>
										))}
									</TableRow>
								);
							})}
							{emptyRows > 0 && (
								<TableRow
									style={{
										height: (isDense ? 33 : 53) * emptyRows
									}}
								>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</Box>
	);
};

export default EnhancedTable;
