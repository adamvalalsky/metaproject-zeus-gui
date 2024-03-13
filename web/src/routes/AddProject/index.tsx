import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import React from 'react';
import { Form, useActionData } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ProjectActionData } from './action.ts';

const AddProject: React.FC = () => {
	const { t } = useTranslation();
	const actionData = useActionData() as ProjectActionData;

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
			<Typography component="h1" variant="h4">
				{t('routes.AddProject.title')}
			</Typography>
			<Box
				sx={{
					width: '80%'
				}}
			>
				{actionData?.showConnectionError && (
					<Alert severity="error" sx={{ mt: 2 }}>
						{t('routes.AddProject.error.connection')}
					</Alert>
				)}
				<Form method="post">
					<TextField
						error={actionData?.showConflictError}
						fullWidth
						id="title"
						name="title"
						label="Title"
						variant="outlined"
						margin="normal"
						helperText={actionData?.showConflictError ? t('routes.AddProject.error.projectExists') : ''}
						required
					/>
					<TextField
						fullWidth
						id="description"
						name="description"
						label="Description"
						variant="outlined"
						multiline
						required
						minRows={4}
					/>
					<Button
						type="submit"
						variant="contained"
						color="success"
						sx={{ margin: '0 auto', mt: 2, display: 'block', width: 200, color: 'primary.contrastText' }}
					>
						{t('routes.AddProject.form.submit')}
					</Button>
				</Form>
			</Box>
		</Box>
	);
};

export default AddProject;
