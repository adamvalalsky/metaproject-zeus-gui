import Box from '@mui/material/Box';
import React from 'react';
import { Alert, Divider, Typography } from '@mui/material';
import { HeadCellSettings } from '../../components/EnhancedTable/EnhancedTableHead/types.ts';
import EnhancedTable from '../../components/EnhancedTable';

// TODO will be moved somewhere else where project is
type Project = {
	id: number;
	name: string;
	description: string;
	status: string;
};

const Dashboard: React.FC = () => {
	// TODO this will be some fetch call
	const projects = [
		{ id: 1, name: 'Project 1', description: 'Some description', status: 'Active' },
		{
			id: 2,
			name: 'Project 2',
			description:
				'Some looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong description',
			status: 'Inactive'
		}
	];

	const headCells: HeadCellSettings<Project>[] = [
		{
			id: 'id',
			numeric: true,
			disablePadding: true,
			label: 'ID'
		},
		{
			id: 'name',
			numeric: false,
			disablePadding: false,
			label: 'Name'
		},
		{
			id: 'description',
			numeric: false,
			disablePadding: false,
			label: 'Description'
		},
		{
			id: 'status',
			numeric: false,
			disablePadding: false,
			label: 'Status'
		}
	];
	return (
		<Box
			sx={{
				marginTop: 15,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center'
			}}
		>
			<Typography component="h1" variant="h4">
				Projects
			</Typography>
			<Divider variant="middle" flexItem sx={{ pt: 3, width: 300, alignSelf: 'center' }} />
			{projects.length === 0 && (
				<Alert severity="warning" sx={{ width: 500, mt: 3 }}>
					No projects found for current user
				</Alert>
			)}
			{projects.length > 0 && (
				<Box maxWidth="80%">
					<EnhancedTable
						rows={projects}
						canSelect={false}
						headCells={headCells}
						isDense={false}
						defaultRowsPerPage={5}
						initialOrder={'asc'}
						initialOrderBy={'id'}
					/>
				</Box>
			)}
		</Box>
	);
};

export default Dashboard;
