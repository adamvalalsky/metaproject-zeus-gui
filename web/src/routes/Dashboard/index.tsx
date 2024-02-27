import Box from '@mui/material/Box';
import React from 'react';
import { Alert, Divider, Typography } from '@mui/material';
import { useLoaderData } from 'react-router-dom';
import BasicTable from '../../components/BasicTable';
import useWindowSize from '../../hooks/useWindowSize.ts';
import { HeadCell } from '../../components/BasicTable/types.ts';

// TODO will be moved somewhere else where project is
type Project = {
	id: number;
	name: string;
	description: string;
	status: string;
};

const id: HeadCell<Project> = { selector: 'id', displayName: 'ID' };
const name: HeadCell<Project> = { selector: 'name', displayName: 'Name' };
const description: HeadCell<Project> = { selector: 'description', displayName: 'Description' };
const status: HeadCell<Project> = { selector: 'status', displayName: 'Status' };

const getHeadNames = (windowSize: number): HeadCell<Project>[] => {
	if (windowSize < 600) {
		return [name];
	}

	if (windowSize < 900) {
		return [name, description];
	}

	if (windowSize < 1100) {
		return [name, description, status];
	}

	return [id, name, description, status];
};

const Dashboard: React.FC = () => {
	const windowSize = useWindowSize();
	// TODO this will be some fetch call
	const projects = useLoaderData();

	const headCells = getHeadNames(windowSize);
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
			{projects.length > 0 && <BasicTable head={headCells} rows={projects} />}
		</Box>
	);
};

export default Dashboard;
