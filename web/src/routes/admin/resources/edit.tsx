import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import React from 'react';
import { Box } from '@mantine/core';

import NotFound from '@/components/global/not-found';
import { useResourceDetailQuery } from '@/modules/allocation/queries';
import Loading from '@/components/global/loading';
import PageBreadcrumbs from '@/components/global/page-breadcrumbs';

const ResourceEditPage = () => {
	const { t } = useTranslation();
	const { id } = useParams();

	if (!id || isNaN(+id)) {
		return <NotFound />;
	}

	const { data, isPending, isError } = useResourceDetailQuery(+id);

	if (isPending) {
		return <Loading />;
	}

	if (isError) {
		return <NotFound />;
	}

	return (
		<Box>
			<PageBreadcrumbs
				links={[
					{ title: t('components.global.drawerList.links.admin.title'), href: '/admin' },
					{ title: t('components.global.drawerList.links.admin.link.resources'), href: '/admin/resources' },
					{ title: data.name, href: `/admin/resources/${id}` },
					{ title: 'Edit resource', href: `/admin/resources/${id}/edit` }
				]}
			/>
			<h1>Edit resource</h1>
		</Box>
	);
};

export default ResourceEditPage;
