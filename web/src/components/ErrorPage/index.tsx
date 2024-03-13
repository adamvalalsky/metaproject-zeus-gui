import { useRouteError } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

const ErrorPage: React.FC = () => {
	const { t } = useTranslation();
	const error = useRouteError() as { statusText: string; message: string };

	return (
		<Box
			className="error-page"
			display="flex"
			alignItems="center"
			justifyContent="center"
			minHeight="100vh"
			flexDirection="column"
		>
			<Typography variant="h3" align="center" gutterBottom>
				{t('components.ErrorPage.title')}
			</Typography>
			<Typography variant="h6" gutterBottom>
				{t('components.ErrorPage.description')}
			</Typography>
			<Typography variant="subtitle1">{error.statusText || error.message}</Typography>
		</Box>
	);
};

export default ErrorPage;
