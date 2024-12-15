import { useTranslation } from 'react-i18next';
import { Box, Button, Group, Stack, Stepper, Text, Title } from '@mantine/core';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';

import { useProjectOutletContext } from '@/modules/auth/guards/project-detail-guard';
import PageBreadcrumbs from '@/components/global/page-breadcrumbs';
import ResourceTypeStep from '@/components/project/allocations/request-stepper/resource-type';
import ResourceStep from '@/components/project/allocations/request-stepper/resource';
import Loading from '@/components/global/loading';
import ErrorAlert from '@/components/global/error-alert';
import { addAllocationSchema, type AddAllocationSchema } from '@/modules/allocation/form';
import { useRequestAllocationMutation } from '@/modules/allocation/api/request-allocation';
import { useResourceListQuery } from '@/modules/resource/api/resources';

const MAX_STEPS = 2;

const AllocationRequest = () => {
	const { project } = useProjectOutletContext();
	const { t } = useTranslation();
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const form = useForm<AddAllocationSchema>({
		resolver: zodResolver(addAllocationSchema)
	});

	const [active, setActive] = useState(0);
	const [doneSteps, setDoneSteps] = useState<Set<number>>(new Set([]));
	const [resourceType, setResourceType] = useState<number | null>(null);
	const [selectedResourceId, setSelectedResourceId] = useState<number | null>(null);

	const { mutate, isPending: isFormPending } = useRequestAllocationMutation();
	const { data: resources, isPending, isError } = useResourceListQuery();

	const nextStep = () => setActive(current => (current < MAX_STEPS ? current + 1 : current));
	const prevStep = () => setActive(current => (current > 0 ? current - 1 : current));

	if (isPending) {
		return <Loading />;
	}

	if (isError) {
		return <ErrorAlert />;
	}

	const onSubmit = (data: AddAllocationSchema) => {
		mutate(
			{
				projectId: project.id,
				...data
			},
			{
				onSuccess: () => {
					queryClient
						.refetchQueries({
							queryKey: ['project', project.id]
						})
						.then(() => {
							notifications.show({
								color: 'green',
								message: t('routes.AllocationRequest.notifications.success')
							});
							navigate(`/project/${project.id}`);
						});
				},
				onError: () => {
					notifications.show({
						color: 'red',
						message: t('routes.AllocationRequest.notifications.error')
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
					{ title: 'Request allocation', href: `/project/${project.id}/allocation` }
				]}
			/>
			<Stack align="center" gap={3} justify="center">
				<Title>{t('routes.AllocationRequest.title')}</Title>
				<Text>{t('routes.AllocationRequest.information')}</Text>
			</Stack>

			<Box my={20}>
				<FormProvider {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<Stepper active={active} onStepClick={setActive}>
							<Stepper.Step
								label={t('routes.AllocationRequest.form.step1.title')}
								description={t('routes.AllocationRequest.form.step1.description')}
							>
								<ResourceTypeStep
									resourceTypeId={resourceType}
									setResourceType={setResourceType}
									setComplete={() => setDoneSteps(new Set([...doneSteps, 0]))}
								/>
							</Stepper.Step>
							<Stepper.Step
								allowStepSelect={doneSteps.has(0)}
								label={t('routes.AllocationRequest.form.step2.title')}
								description={t('routes.AllocationRequest.form.step2.description')}
							>
								<ResourceStep
									resources={
										resources?.filter(resource => resource.resourceType.id === resourceType) ?? []
									}
									selectedResourceId={selectedResourceId}
									setSelectedResourceId={setSelectedResourceId}
									isPending={isFormPending}
								/>
							</Stepper.Step>
						</Stepper>
					</form>
				</FormProvider>

				{active < MAX_STEPS - 1 && (
					<Group justify="center" mt="xl">
						{active > 0 && (
							<Button variant="default" onClick={prevStep}>
								{t('routes.AllocationRequest.form.buttons.back')}
							</Button>
						)}
						<Button disabled={!doneSteps.has(active)} onClick={nextStep}>
							{t('routes.AllocationRequest.form.buttons.next')}
						</Button>
					</Group>
				)}
			</Box>
		</Box>
	);
};

export default AllocationRequest;
