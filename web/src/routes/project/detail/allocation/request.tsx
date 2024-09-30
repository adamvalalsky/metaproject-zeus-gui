import { useTranslation } from 'react-i18next';
import { Box, Button, Group, Stack, Stepper, Text, Title } from '@mantine/core';
import React, { useState } from 'react';

import { useProjectOutletContext } from '@/modules/auth/guards/project-detail-guard';
import PageBreadcrumbs from '@/components/global/page-breadcrumbs';
import ResourceTypeStep from '@/components/project/allocations/request-stepper/resource-type';
import ResourceStep from '@/components/project/allocations/request-stepper/resource';

const MAX_STEPS = 3;

const AllocationRequest = () => {
	const { project } = useProjectOutletContext();
	const { t } = useTranslation();

	const [active, setActive] = useState(0);
	const [doneSteps, setDoneSteps] = useState<Set<number>>(new Set([]));
	const nextStep = () => setActive(current => (current < MAX_STEPS ? current + 1 : current));
	const prevStep = () => setActive(current => (current > 0 ? current - 1 : current));

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
				<Stepper active={active} onStepClick={setActive} allowNextStepsSelect={false}>
					<Stepper.Step
						label={t('routes.AllocationRequest.form.step1.title')}
						description={t('routes.AllocationRequest.form.step1.description')}
					>
						<ResourceTypeStep setComplete={() => setDoneSteps(new Set([...doneSteps, 0]))} />
					</Stepper.Step>
					<Stepper.Step
						label={t('routes.AllocationRequest.form.step2.title')}
						description={t('routes.AllocationRequest.form.step2.description')}
					>
						<ResourceStep />
					</Stepper.Step>
					<Stepper.Step>Resource options</Stepper.Step>
					<Stepper.Step>Review</Stepper.Step>
				</Stepper>

				<Group justify="center" mt="xl">
					<Button variant="default" onClick={prevStep}>
						{t('routes.AllocationRequest.form.buttons.back')}
					</Button>
					<Button disabled={!doneSteps.has(active)} onClick={nextStep}>
						{t('routes.AllocationRequest.form.buttons.next')}
					</Button>
				</Group>
			</Box>
		</Box>
	);
};

export default AllocationRequest;
