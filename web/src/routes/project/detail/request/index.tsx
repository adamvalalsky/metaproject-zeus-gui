import { Box, Divider, Flex, Spoiler, Title } from '@mantine/core';
import { FormProvider, useForm } from 'react-hook-form';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { notifications } from '@mantine/notifications';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import RequestForm from '@/components/project/request-form';
import PageBreadcrumbs from '@/components/global/page-breadcrumbs';
import { useProjectOutletContext } from '@/modules/auth/guards/project-detail-guard';
import { requestProjectSchema, type RequestProjectSchema } from '@/modules/project/form';
import CommentsTimeline from '@/components/project/comments-timeline';
import { useReRequestProjectMutation } from '@/modules/project/mutations';
import { ApiClientError } from '@/modules/api/model';

const ProjectRequestPage = () => {
	const { t } = useTranslation();
	const { project, rejectedComments } = useProjectOutletContext();
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const form = useForm<RequestProjectSchema>({
		resolver: zodResolver(requestProjectSchema),
		defaultValues: {
			title: project.title,
			link: project.link,
			description: project.description
		}
	});
	const { mutate, isPending } = useReRequestProjectMutation();

	const onSubmit = (values: RequestProjectSchema) => {
		mutate(
			{ projectId: project.id, ...values },
			{
				onSuccess: () => {
					notifications.show({
						message: t('routes.ProjectRequestPage.success_message')
					});
					queryClient
						.refetchQueries({
							queryKey: ['project', project.id]
						})
						.then(() => {
							navigate(`/project/${project.id}`);
						});
				},
				onError: error => {
					if (error instanceof ApiClientError) {
						if (error.response.status === 409) {
							notifications.show({
								message: t('routes.ProjectRequestPage.conflict_message'),
								color: 'red'
							});
							form.setError('title', {
								type: 'custom',
								message: t('routes.ProjectRequestPage.conflict_message')
							});
							return;
						}
					}

					notifications.show({
						message: t('routes.ProjectRequestPage.error_message'),
						color: 'red'
					});
				}
			}
		);
	};

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
							loading={isPending}
							submitText={t('routes.ProjectRequestPage.submit_text')}
						/>
					</FormProvider>
				</Box>
			</Flex>
		</Box>
	);
};

export default ProjectRequestPage;
