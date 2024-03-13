import Box from '@mui/material/Box';
import React, { Suspense } from 'react';
import { Alert, Button, Divider, LinearProgress, Typography } from '@mui/material';
import { Await, Link, useLoaderData } from 'react-router-dom';
import { Add } from '@mui/icons-material';
import useWindowSize from '../../hooks/useWindowSize.ts';
import { HeadCell } from '../../components/BasicTable/types.ts';
import BasicTable from '../../components/BasicTable';
import { Project } from '../../modules/project/model.ts';
import { DeferredProjectResponse } from './loader.ts';

const id: HeadCell<Project> = { selector: 'id', displayName: 'ID' };
const name: HeadCell<Project> = { selector: 'title', displayName: 'Name' };
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
	const data = useLoaderData() as DeferredProjectResponse;

	const headCells = getHeadNames(windowSize);
	return (
		<Box
			sx={{
				marginTop: 15,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'left'
			}}
		>
			<Box sx={{ width: '80%', marginTop: 2 }}>
				<Box sx={{ display: 'flex' }}>
					<Typography component="h1" variant="h4">
						Projects
					</Typography>
					<Link to={`add`} style={{ marginLeft: 'auto' }}>
						<Button variant="contained" startIcon={<Add />}>
							Add project
						</Button>
					</Link>
				</Box>
				<Divider flexItem sx={{ pt: 3, width: 400, alignSelf: 'center' }} />
				<Suspense fallback={<LinearProgress />}>
					<Await
						resolve={data.response}
						errorElement={
							<Alert severity="error" sx={{ mt: 3 }}>
								Could not load projects, try again later.
							</Alert>
						}
					>
						{(response) => (
							<>
								{response.data.projects.length === 0 && (
									<Alert severity="warning" sx={{ mt: 3 }}>
										No projects found for current user
									</Alert>
								)}
								{response.data.projects.length > 0 && (
									<BasicTable head={headCells} rows={response.data.projects} />
								)}
							</>
						)}
					</Await>
				</Suspense>
			</Box>
		</Box>
	);
};

export default Dashboard;
