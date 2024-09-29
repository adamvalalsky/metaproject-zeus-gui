import { useTranslation } from 'react-i18next';
import { Box, Button, Group, Stack, Stepper, Text, Title } from '@mantine/core';
import React, { useState } from 'react';

import { useProjectOutletContext } from '@/modules/auth/guards/project-detail-guard';
import PageBreadcrumbs from '@/components/global/page-breadcrumbs';

const MAX_STEPS = 3;

const AllocationRequest = () => {
	const { project } = useProjectOutletContext();
	const { t } = useTranslation();

	const [active, setActive] = useState(0);
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
			<Stack align="center" gap={1} justify="center">
				<Title>{t('routes.AllocationRequest.title')}</Title>
				<Title order={3} pb={30} pt={15}>
					Title: {project.title}
				</Title>
			</Stack>
			<Group justify="center">
				<Text>{t('routes.AllocationRequest.information')}</Text>
			</Group>

			<Box my={20}>
				<Stepper active={active} onStepClick={setActive} allowNextStepsSelect={false}>
					<Stepper.Step>Resource type selection</Stepper.Step>
					<Stepper.Step>Resource selection</Stepper.Step>
					<Stepper.Step>Resource options</Stepper.Step>
					<Stepper.Step>Review</Stepper.Step>
				</Stepper>

				<Group justify="center" mt="xl">
					<Button variant="default" onClick={prevStep}>
						{t('routes.AllocationRequest.form.buttons.back')}
					</Button>
					<Button onClick={nextStep}>{t('routes.AllocationRequest.form.buttons.next')}</Button>
				</Group>
			</Box>
		</Box>
	);
};

export default AllocationRequest;
