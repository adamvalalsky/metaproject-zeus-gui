import { Box, Button, Group, rem, Title, Tooltip } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { IconChevronRight } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import { FormProvider, useForm } from 'react-hook-form';

import { useProjectOutletContext } from '@/modules/auth/guards/project-detail-guard';
import PageBreadcrumbs from '@/components/global/page-breadcrumbs';
import ProjectInfo from '@/components/project/info';
import TextEditor from '@/components/global/text-editor';

const ProjectRequestDetail = () => {
	const { t } = useTranslation();
	const { project } = useProjectOutletContext();

	const form = useForm();

	const openApproveModal = () => {
		modals.openConfirmModal({
			title: t('routes.ProjectRequestDetail.approve_modal.title'),
			centered: true,
			children: t('routes.ProjectRequestDetail.approve_modal.content'),
			labels: {
				confirm: t('routes.ProjectRequestDetail.approve_modal.confirm_text'),
				cancel: t('routes.ProjectRequestDetail.approve_modal.cancel_text')
			},
			confirmProps: {
				color: 'green'
			},
			onConfirm: () => {
				console.log('confirmed');
			}
		});
	};

	const openRejectModal = () => {
		modals.openConfirmModal({
			title: t('routes.ProjectRequestDetail.reject_modal.title'),
			centered: true,
			size: 'xl',
			children: (
				<FormProvider {...form}>
					<form>
						<TextEditor
							label={t('routes.ProjectRequestDetail.reject_modal.content.label')}
							description={t('routes.ProjectRequestDetail.reject_modal.content.description')}
							inputHtmlName="description"
						/>
					</form>
				</FormProvider>
			),
			labels: {
				confirm: t('routes.ProjectRequestDetail.reject_modal.confirm_text'),
				cancel: t('routes.ProjectRequestDetail.reject_modal.cancel_text')
			},
			confirmProps: {
				color: 'red.7'
			},
			onConfirm: () => {
				console.log('confirmed');
			}
		});
	};

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

			<Group grow pt={20} pb={70}>
				<Button color="green" onClick={openApproveModal}>
					{t('routes.ProjectRequestDetail.approve_button')}
				</Button>
				<Button color="red.7" variant="outline" onClick={openRejectModal}>
					{t('routes.ProjectRequestDetail.reject_button')}
				</Button>
			</Group>
		</Box>
	);
};

export default ProjectRequestDetail;
