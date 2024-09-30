import { Box, Button, Group, Title } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import React from 'react';

import PageBreadcrumbs from '@/components/global/page-breadcrumbs';

const ResourceList = () => {
	const { t } = useTranslation();

	return (
		<Box>
			<PageBreadcrumbs
				links={[
					{ title: t('components.global.drawerList.links.admin.title'), href: '/admin' },
					{ title: t('components.global.drawerList.links.admin.link.resources'), href: '/admin/requests' }
				]}
			/>
			<Group justify="space-between">
				<Title order={2}>{t('routes.ResourceList.title')}</Title>
				<Button component={Link} to="add" leftSection={<IconPlus />}>
					{t('routes.ResourceList.add_button')}
				</Button>
			</Group>
		</Box>
	);
};

export default ResourceList;
