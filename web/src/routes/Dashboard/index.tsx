import Box from '@mui/material/Box';
import React, { Suspense } from 'react';
import { Alert, Button, Divider, LinearProgress, Typography } from '@mui/material';
import { Await, Link, useLoaderData } from 'react-router-dom';
import { Add } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import useWindowSize from '../../hooks/useWindowSize.ts';
import { HeadCell } from '../../components/BasicTable/types.ts';
import BasicTable from '../../components/BasicTable';
import { Project } from '../../modules/project/model.ts';
import { DeferredProjectResponse } from './loader.ts';

const Dashboard: React.FC = () => {
	const windowSize = useWindowSize();
	const { t } = useTranslation();
	const data = useLoaderData() as DeferredProjectResponse;

	const id: HeadCell<Project> = { selector: 'id', displayName: t('routes.Dashboard.table.id') };
	const name: HeadCell<Project> = { selector: 'title', displayName: t('routes.Dashboard.table.name') };
	const description: HeadCell<Project> = {
		selector: 'description',
		displayName: t('routes.Dashboard.table.description')
	};
	const status: HeadCell<Project> = { selector: 'status', displayName: t('routes.Dashboard.table.status') };

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
						{t('routes.Dashboard.title')}
					</Typography>
					<Link to={`add`} style={{ marginLeft: 'auto' }}>
						<Button variant="contained" startIcon={<Add />}>
							{t('routes.Dashboard.requestButton')}
						</Button>
					</Link>
				</Box>
				<Divider flexItem sx={{ pt: 3, width: 400, alignSelf: 'center' }} />
				<Suspense fallback={<LinearProgress />}>
					<Await
						resolve={data.response}
						errorElement={
							<Alert severity="error" sx={{ mt: 3 }}>
								{t('routes.Dashboard.error.connection')}
							</Alert>
						}
					>
						{(response) => (
							<>
								{response.data.projects.length === 0 && (
									<Alert severity="warning" sx={{ mt: 3 }}>
										{t('routes.Dashboard.error.noProjects')}
									</Alert>
								)}
								{response.data.projects.length > 0 && (
									<BasicTable head={headCells} rows={response.data.projects} isRowClickable={true} />
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
