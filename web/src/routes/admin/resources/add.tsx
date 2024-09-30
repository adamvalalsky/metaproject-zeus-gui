import { Box, Title } from '@mantine/core';
import React from 'react';
import { useTranslation } from 'react-i18next';

import PageBreadcrumbs from '@/components/global/page-breadcrumbs';

const ResourceAddPage = () => {
	const { t } = useTranslation();
	return (
		<Box>
			<PageBreadcrumbs
				links={[
					{ title: t('components.global.drawerList.links.admin.title'), href: '/admin' },
					{ title: t('components.global.drawerList.links.admin.link.resources'), href: '/admin/requests' },
					{ title: t('routes.ResourceAddPage.title'), href: '/admin/resources/add' }
				]}
			/>
			<Title order={2}>{t('routes.ResourceAddPage.title')}</Title>
		</Box>
	);
};

export default ResourceAddPage;
