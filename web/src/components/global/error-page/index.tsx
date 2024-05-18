import { Link, useRouteError } from 'react-router-dom';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Container, Group, Text, Title } from '@mantine/core';

import classes from './error.module.css';

const ErrorPage: React.FC = () => {
	const { t } = useTranslation();
	const error = useRouteError() as { statusText: string; message: string };

	return (
		<Container className={classes.root}>
			<div className={classes.inner}>
				<div className={classes.content}>
					<Title className={classes.title}>Error</Title>
					{error?.statusText && error?.message && (
						<Text c="dimmed" ta="center">
							{error?.statusText}: {error?.message}
						</Text>
					)}
					<Text c="dimmed" size="lg" ta="center" className={classes.description}>
						Error occurred while loading the page. Please try again later.
					</Text>
					<Group justify="center">
						<Button size="md" component={Link} to="/">
							Take me back to home page
						</Button>
					</Group>
				</div>
			</div>
		</Container>
	);
};

export default ErrorPage;
