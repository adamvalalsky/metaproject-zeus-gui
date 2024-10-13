import { Box, Title } from '@mantine/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';

import PageBreadcrumbs from '@/components/global/page-breadcrumbs';
import { addResourceSchema, type AddResourceSchema } from '@/modules/allocation/form';
import { useCreateResourceMutation } from '@/modules/allocation/mutations';
import { type Attribute } from '@/modules/attribute/model';
import ResourceForm from '@/components/resource/resource-form';

const ResourceAddPage = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const [attributes, setAttributes] = useState<Attribute[]>([]);

	const form = useForm<AddResourceSchema>({
		resolver: zodResolver(addResourceSchema)
	});

	const { mutate, isPending } = useCreateResourceMutation();

	const onSubmit = (data: AddResourceSchema) => {
		mutate(data, {
			onSuccess: () => {
				notifications.show({
					message: t('routes.ResourceAddPage.notifications.success.message'),
					color: 'green'
				});
				queryClient
					.refetchQueries({
						queryKey: ['resource']
					})
					.then(() => {
						navigate('/admin/resources');
					});
			},
			onError: () => {
				notifications.show({
					message: t('routes.ResourceAddPage.notifications.error.message'),
					color: 'red'
				});
			}
		});
	};

	return (
		<Box>
			<PageBreadcrumbs
				links={[
					{ title: t('components.global.drawerList.links.admin.title'), href: '/admin' },
					{ title: t('components.global.drawerList.links.admin.link.resources'), href: '/admin/requests' },
					{ title: t('routes.ResourceAddPage.title'), href: '/admin/resources/add' }
				]}
			/>
			<Title order={2}>{t('routes.ResourceAddPage.title')}</Title>
			<Box mt={15}>
				<FormProvider {...form}>
					<ResourceForm
						isPending={isPending}
						setAttributes={setAttributes}
						attributes={attributes}
						onSubmit={onSubmit}
					/>
				</FormProvider>
			</Box>
		</Box>
	);
};

export default ResourceAddPage;
