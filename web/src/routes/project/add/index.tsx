import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Button, Flex, Textarea, TextInput, Title } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { notifications } from '@mantine/notifications';

import { useAddProjectMutation } from '@/modules/project/mutations';
import { ApiClientError } from '@/modules/api/model';
import { requestProjectSchema, type RequestProjectSchema } from '@/modules/project/form';
import PageBreadcrumbs from '@/components/global/page-breadcrumbs';

const AddProject: React.FC = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { mutate, isPending } = useAddProjectMutation();
	const {
		handleSubmit,
		register,
		setError,
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

				notifications.show({
					title: 'Project request created.',
					message: 'You can now wait for the project to be approved by the admin.'
				});
				navigate(`/project/${projectId}`);
			},
			onError: error => {
				if (error instanceof ApiClientError) {
					if (error.response.status === 409) {
						notifications.show({
							title: 'Project with this title already exists.',
							message: 'Please choose a different title.',
							color: 'red'
						});
						setError('title', { type: 'custom', message: 'Project with this title already exists.' });
						return;
					}
				}

				notifications.show({
					title: 'Failed to create project.',
					message: 'Please try again later.',
					color: 'red'
				});
			}
		});
	};

	return (
		<Box>
			<PageBreadcrumbs
				links={[
					{ title: 'Projects', href: '/project' },
					{ title: 'Add project', href: `/project/add` }
				]}
			/>
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
		</Box>
	);
};

export default AddProject;
