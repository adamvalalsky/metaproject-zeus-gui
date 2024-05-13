import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Button, Flex, Textarea, TextInput, Title } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAddProjectMutation } from '@/modules/project/mutations';
import { ApiClientError } from '@/modules/api/model';
import { requestProjectSchema, type RequestProjectSchema } from '@/modules/project/form';

const AddProject: React.FC = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { mutate, isPending } = useAddProjectMutation();
	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm<RequestProjectSchema>({
		resolver: zodResolver(requestProjectSchema)
	});

	const onSubmit = (values: RequestProjectSchema) => {
		mutate(values, {
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
				<form onSubmit={handleSubmit(onSubmit)}>
					<TextInput
						label="Title"
						withAsterisk
						placeholder="Project title"
						error={errors.title?.message}
						{...register('title')}
					/>
					<Textarea
						autosize
						label="Description"
						withAsterisk
						minRows={4}
						placeholder="Project description"
						error={errors.description?.message}
						{...register('description')}
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
