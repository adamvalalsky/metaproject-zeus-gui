import {
	Anchor,
	Box,
	Button,
	Group,
	type RenderTreeNodePayload,
	Text,
	Title,
	Tree,
	type TreeNodeData,
	useTree
} from '@mantine/core';
import { IconChevronDown, IconLink, IconPlus } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';

import PageBreadcrumbs from '@/components/global/page-breadcrumbs';
import { useResourceListQuery } from '@/modules/allocation/queries';
import Loading from '@/components/global/loading';
import ErrorAlert from '@/components/global/error-alert';
import { type Resource } from '@/modules/allocation/model';

const getDataTree = (data: Resource[], parentResourceId: number | null): TreeNodeData[] =>
	data
		.filter(item => item.parentResourceId === parentResourceId)
		.map(item => ({
			value: item.id.toString(),
			label: (
				<Group gap={10}>
					<Text fw={400}>{item.name}</Text>
					<Text c="dimmed">({item.resourceType.name})</Text>
					<Group align="center">
						<Anchor component={Link} to={`${item.id}`}>
							Detail <IconLink size={13} />
						</Anchor>
					</Group>
				</Group>
			),
			children: getDataTree(data, item.id)
		}));

const Leaf = ({ node, expanded, hasChildren, elementProps }: RenderTreeNodePayload) => (
	<Group py={5} {...elementProps}>
		{hasChildren && (
			<IconChevronDown size={20} style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }} />
		)}
		{node.label}
	</Group>
);

const ResourceList = () => {
	const { t } = useTranslation();
	const { data, isPending, isError } = useResourceListQuery();
	const tree = useTree();

	if (isPending) {
		return <Loading />;
	}

	if (isError) {
		return <ErrorAlert />;
	}

	useEffect(() => {
		tree.expandAllNodes();
	}, []);

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
			<Box my={20}>
				<Tree tree={tree} data={getDataTree(data, null)} renderNode={payload => <Leaf {...payload} />} />
			</Box>
		</Box>
	);
};

export default ResourceList;
