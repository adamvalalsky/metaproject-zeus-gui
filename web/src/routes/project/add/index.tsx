import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Button, Flex, Textarea, TextInput, Title } from '@mantine/core';

import { useAddProjectMutation } from '@/modules/project/mutations';
import { ApiClientError } from '@/modules/api/model';

const AddProject: React.FC = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { mutate, isPending } = useAddProjectMutation();

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);

		mutate(formData, {
			onSuccess: projectId => {
				if (!projectId) {
					navigate('/project');
				}

				navigate(`/project/${projectId}`);
			},
			onError: error => {
				if (error instanceof ApiClientError) {
					if (error.response.status === 409) {
						// TODO Project exists validation
					}
				}

				// TODO general error
			}
		});
	};

	return (
		<Flex mt={100} direction="column" align="center">
			<Title order={1}>{t('routes.AddProject.title')}</Title>
			<Box w="80%">
				<form onSubmit={onSubmit}>
					<TextInput id="title" name="title" label="Title" withAsterisk placeholder="Project title" />
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
						<Button loading={isPending} type="submit" variant="filled" color="teal" mt={10} w={200}>
							{t('routes.AddProject.form.submit')}
						</Button>
					</Flex>
				</form>
			</Box>
		</Flex>
	);
};

export default AddProject;
