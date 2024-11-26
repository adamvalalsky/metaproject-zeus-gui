import { useParams } from 'react-router';
import { Box, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import PageBreadcrumbs from '@/components/global/page-breadcrumbs';
import { useProjectOutletContext } from '@/modules/auth/guards/project-detail-guard';

const AllocationDetail = () => {
	const { t } = useTranslation();
	const { project } = useProjectOutletContext();
	const { allocationId } = useParams();

	return (
		<Box>
			<PageBreadcrumbs
				links={[
					{ title: 'Projects', href: '/project' },
					{ title: project.title, href: `/project/${project.id}` },
					{ title: 'Request allocation', href: `/project/${project.id}/allocation` }
				]}
			/>
			<Title>{t('routes.AllocationDetail.title')}</Title>
		</Box>
	);
};

export default AllocationDetail;
