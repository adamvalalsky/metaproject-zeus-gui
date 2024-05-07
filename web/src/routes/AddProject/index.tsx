import React from 'react';
import { Form, useActionData } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Alert, Box, Button, Flex, Textarea, TextInput, Title } from '@mantine/core';

import { type ProjectActionData } from '@/routes/AddProject/action';

const AddProject: React.FC = () => {
	const { t } = useTranslation();
	const actionData = useActionData() as ProjectActionData;

	return (
		<Flex mt={100} direction="column" align="center">
			<Title order={1}>{t('routes.AddProject.title')}</Title>
			<Box w="80%">
				{actionData?.showConnectionError && (
					<Alert color="red" variant="light" mt={10}>
						{t('routes.AddProject.error.connection')}
					</Alert>
				)}
				<Form method="post">
					<TextInput
						id="title"
						name="title"
						label="Title"
						error={actionData?.showConflictError ? t('routes.AddProject.error.projectExists') : ''}
						withAsterisk
						placeholder="Project title"
					/>
					<Textarea
						id="description"
						autosize
						name="description"
						label="Description"
						withAsterisk
						minRows={4}
						placeholder="Project description"
					/>
					<Flex justify="center">
						<Button type="submit" variant="filled" color="teal" mt={10} w={200}>
							{t('routes.AddProject.form.submit')}
						</Button>
					</Flex>
				</Form>
			</Box>
		</Flex>
	);
};

export default AddProject;
