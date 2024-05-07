import { useRouteError } from 'react-router-dom';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Flex, Text, Title } from '@mantine/core';

const ErrorPage: React.FC = () => {
	const { t } = useTranslation();
	const error = useRouteError() as { statusText: string; message: string };

	return (
		<Flex align="center" justify="center" className="error-page" h="100vh" direction="column">
			<Title order={3} ta="center">
				{t('components.global.errorPage.title')}
			</Title>
			<Title order={5}>{t('components.global.errorPage.description')}</Title>
			<Text>{error.statusText || error.message}</Text>
		</Flex>
	);
};

export default ErrorPage;
