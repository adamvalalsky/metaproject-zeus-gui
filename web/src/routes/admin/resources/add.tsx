import { Box, Button, Select, Textarea, TextInput, Title } from '@mantine/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import PageBreadcrumbs from '@/components/global/page-breadcrumbs';
import { useResourceListQuery, useResourceTypesQuery } from '@/modules/allocation/queries';
import Loading from '@/components/global/loading';
import ErrorAlert from '@/components/global/error-alert';
import { addResourceSchema, type AddResourceSchema } from '@/modules/allocation/form';

const ResourceAddPage = () => {
	const { t } = useTranslation();
	const { register, handleSubmit, control } = useForm<AddResourceSchema>({
		resolver: zodResolver(addResourceSchema)
	});
	const {
		data: resourceTypes,
		isPending: isResourceTypePending,
		isError: isResourceTypeError
	} = useResourceTypesQuery();
	const { data: resources, isPending: isResourcesPending, isError: isResourcesError } = useResourceListQuery();

	if (isResourceTypePending || isResourcesPending) {
		return <Loading />;
	}

	if (isResourceTypeError || isResourcesError) {
		return <ErrorAlert />;
	}

	const onSubmit = (data: any) => {
		console.log(data);
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
				<form onSubmit={handleSubmit(onSubmit)}>
					<TextInput label="Name" withAsterisk placeholder="Resource name" {...register('name')} />
					<Textarea
						label="Description"
						withAsterisk
						placeholder="Resource description"
						{...register('description')}
					/>
					<Controller
						control={control}
						name="resourceTypeId"
						render={({ field }) => (
							<Select
								name={field.name}
								label={t('routes.ResourceAddPage.form.type.label')}
								placeholder={t('routes.ResourceAddPage.form.type.placeholder')}
								allowDeselect={false}
								data={resourceTypes.map(option => ({
									value: option.id.toString(),
									label: option.name
								}))}
								onChange={value => (value ? field.onChange(+value) : null)}
							/>
						)}
					/>
					<Button type="submit">Add resource</Button>
				</form>
			</Box>
		</Box>
	);
};

export default ResourceAddPage;
