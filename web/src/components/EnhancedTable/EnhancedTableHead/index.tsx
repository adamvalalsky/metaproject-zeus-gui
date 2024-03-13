import { Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import Box from '@mui/material/Box';
import { visuallyHidden } from '@mui/utils';
import { Order } from '../types.ts';
import { HeadCellSettings } from './types.ts';

type EnhancedTableProps<T> = {
	headCells: HeadCellSettings<T>[];
	numSelected: number;
	onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void;
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
	order: Order;
	orderBy: string;
	rowCount: number;
	canSelect: boolean;
};

const EnhancedTableHead = <T,>(props: EnhancedTableProps<T>) => {
	const { headCells, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, canSelect } = props;

	const createSortHandler = (property: keyof T) => (event: React.MouseEvent<unknown>) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				{canSelect && (
					<TableCell padding="checkbox">
						<Checkbox
							color="primary"
							indeterminate={numSelected > 0 && numSelected < rowCount}
							checked={rowCount > 0 && numSelected === rowCount}
							onChange={onSelectAllClick}
							inputProps={{
								'aria-label': 'select all desserts'
							}}
						/>
					</TableCell>
				)}
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id.toString()}
						align={headCell.numeric ? 'right' : 'left'}
						padding={headCell.disablePadding ? 'none' : 'normal'}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<Box component="span" sx={visuallyHidden}>
									{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
};

export default EnhancedTableHead;
