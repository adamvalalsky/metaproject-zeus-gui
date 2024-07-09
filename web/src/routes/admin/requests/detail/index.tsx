import { Box, Button, Group, rem, Title, Tooltip } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { IconChevronRight } from '@tabler/icons-react';

import { useProjectOutletContext } from '@/modules/auth/guards/project-detail-guard';
import PageBreadcrumbs from '@/components/global/page-breadcrumbs';
import ProjectInfo from '@/components/project/info';

const ProjectRequestDetail = () => {
	const { t } = useTranslation();
	const { project } = useProjectOutletContext();

	return (
		<Box>
			<PageBreadcrumbs
				links={[
					{ title: t('routes.ProjectRequests.title'), href: '/admin/requests' },
					{ title: project.title, href: `/admin/requests/${project.id}` }
				]}
			/>
			<Group justify="space-between">
				<Title>
					{t('routes.ProjectRequestDetail.title_prefix')} {project.title}
				</Title>
				<Tooltip label={t('routes.ProjectRequestDetail.view_project_tooltip')}>
					<Button
						component={Link}
						to={`/project/${project.id}`}
						target="_blank"
						variant="subtle"
						rightSection={<IconChevronRight style={{ width: rem(14), height: rem(14) }} />}
					>
						{t('routes.ProjectRequestDetail.view_project')}
					</Button>
				</Tooltip>
			</Group>
			<ProjectInfo project={project} showFullDescription />
		</Box>
	);
};

export default ProjectRequestDetail;
