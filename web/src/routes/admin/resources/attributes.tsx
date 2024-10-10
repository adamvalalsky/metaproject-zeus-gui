import { Anchor, Badge, Box, Button, Group, Stack, Text, Title } from '@mantine/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { IconPencil, IconPlus } from '@tabler/icons-react';

import PageBreadcrumbs from '@/components/global/page-breadcrumbs';
import { useResourceAttributesQuery } from '@/modules/attribute/queries';
import Loading from '@/components/global/loading';
import ErrorAlert from '@/components/global/error-alert';

const ResourceAttributesPage = () => {
	const { t } = useTranslation();
	const { data, isPending, isError } = useResourceAttributesQuery();

	if (isPending) {
		return <Loading />;
	}

	if (isError) {
		return <ErrorAlert />;
	}

	const valuesToShow = data?.filter(item => !item.name.startsWith('quantity_'));

	return (
		<Box>
			<PageBreadcrumbs
				links={[
					{ title: t('components.global.drawerList.links.admin.title'), href: '/admin' },
					{ title: t('components.global.drawerList.links.admin.link.resources'), href: '/admin/resources' }
				]}
			/>
			<Group justify="space-between">
				<Title order={2}>{t('routes.ResourceAttributesPage.title')}</Title>
				<Group>
					<Button component={Link} to="add" leftSection={<IconPlus />}>
						{t('routes.ResourceAttributesPage.add_button')}
					</Button>
				</Group>
			</Group>
			<Stack mt={20} gap={15}>
				{valuesToShow.map(item => (
					<Stack gap={0} key={item.id}>
						<Group>
							<Text>{item.name}</Text>
							{item.isPublic && (
								<Badge color="yellow" size="sm">
									Public
								</Badge>
							)}
							{item.isRequired && (
								<Badge color="lime" size="sm">
									Required
								</Badge>
							)}
						</Group>
						<Group>
							<Text size="sm" c="dimmed">
								Type: {item.attributeType.name}
							</Text>
							<Anchor size="sm" component={Link} to={`${item.id}`}>
								Edit <IconPencil size={13} />
							</Anchor>
						</Group>
					</Stack>
				))}
			</Stack>
		</Box>
	);
};

export default ResourceAttributesPage;
