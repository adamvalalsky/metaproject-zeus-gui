import { Box, Divider, Flex, Spoiler, Title } from '@mantine/core';
import { FormProvider, useForm } from 'react-hook-form';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';

import RequestForm from '@/components/project/request-form';
import PageBreadcrumbs from '@/components/global/page-breadcrumbs';
import { useProjectOutletContext } from '@/modules/auth/guards/project-detail-guard';
import { requestProjectSchema, type RequestProjectSchema } from '@/modules/project/form';
import CommentsTimeline from '@/components/project/comments-timeline';

const ProjectRequestPage = () => {
	const { t } = useTranslation();
	const { project, rejectedComments } = useProjectOutletContext();

	const form = useForm<RequestProjectSchema>({
		resolver: zodResolver(requestProjectSchema),
		defaultValues: {
			title: project.title,
			description: project.description
		}
	});

	const onSubmit = (values: RequestProjectSchema) => {};

	return (
		<Box>
			<PageBreadcrumbs
				links={[
					{ title: 'Projects', href: '/project' },
					{ title: project.title, href: `/project/${project.id}` },
					{ title: 'Re-request project', href: `/project/${project.id}/request` }
				]}
			/>
			<Flex mt={20} direction="column" align="center">
				<Title order={1}>{t('routes.ProjectRequestPage.title')}</Title>
				<Box w="80%" py={20}>
					<Spoiler
						maxHeight={200}
						showLabel={t('routes.ProjectRequestPage.activity.show_more')}
						hideLabel={t('routes.ProjectRequestPage.activity.hide')}
					>
						<Title order={3}>{t('routes.ProjectRequestPage.activity.title')}</Title>
						<CommentsTimeline rejectedComments={rejectedComments} />
					</Spoiler>
					<Divider my={20} />
					<FormProvider {...form}>
						<RequestForm
							onSubmit={onSubmit}
							loading={false}
							submitText={t('routes.ProjectRequestPage.submit_text')}
						/>
					</FormProvider>
				</Box>
			</Flex>
		</Box>
	);
};

export default ProjectRequestPage;
