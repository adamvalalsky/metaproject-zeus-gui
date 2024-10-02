import { Box, Button, Checkbox, Group, NumberInput, Select, Textarea, TextInput, Title } from '@mantine/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import PageBreadcrumbs from '@/components/global/page-breadcrumbs';
import { useResourceListQuery, useResourceTypesQuery } from '@/modules/allocation/queries';
import Loading from '@/components/global/loading';
import ErrorAlert from '@/components/global/error-alert';
import { addResourceSchema, type AddResourceSchema } from '@/modules/allocation/form';

type Attribute = {
	key: string;
	value: string;
};

const ResourceAddPage = () => {
	const { t } = useTranslation();
	const [quantitySelect, setQuantitySelect] = useState(false);
	const [attributes, setAttributes] = useState<Attribute[]>([]);

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

	const onSubmit = (data: AddResourceSchema) => {
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
					<TextInput my={10} label="Name" withAsterisk placeholder="Resource name" {...register('name')} />
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
								my={10}
								name={field.name}
								withAsterisk
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
					{resources && (
						<Controller
							control={control}
							name="parentResourceId"
							render={({ field }) => (
								<Select
									my={10}
									name={field.name}
									label={t('routes.ResourceAddPage.form.resource.label')}
									description={t('routes.ResourceAddPage.form.resource.description')}
									placeholder={t('routes.ResourceAddPage.form.resource.placeholder')}
									allowDeselect={false}
									data={resources.map(option => ({
										value: option.id.toString(),
										label: option.name
									}))}
									onChange={value => (value ? field.onChange(+value) : null)}
								/>
							)}
						/>
					)}
					<Checkbox
						my={10}
						label={t('routes.ResourceAddPage.form.is_available.label')}
						description={t('routes.ResourceAddPage.form.is_available.description')}
						defaultChecked
						{...register('isAvailable')}
					/>
					<Box my={20}>
						<Checkbox
							checked={quantitySelect}
							onChange={() => setQuantitySelect(!quantitySelect)}
							my={10}
							label={t('routes.ResourceAddPage.form.allow_quantity.label')}
							description={t('routes.ResourceAddPage.form.allow_quantity.description')}
						/>
						{quantitySelect && (
							<Group grow my={10}>
								<TextInput
									label={t('routes.ResourceAddPage.form.quantity_label.label')}
									description={t('routes.ResourceAddPage.form.quantity_label.description')}
									withAsterisk
									placeholder={t('routes.ResourceAddPage.form.quantity_label.placeholder')}
								/>
								<NumberInput
									label={t('routes.ResourceAddPage.form.quantity_default.label')}
									description={t('routes.ResourceAddPage.form.quantity_default.description')}
									withAsterisk
									placeholder={t('routes.ResourceAddPage.form.quantity_default.placeholder')}
									min={0}
								/>
							</Group>
						)}
					</Box>
					<Button type="submit">Add resource</Button>
				</form>
			</Box>
		</Box>
	);
};

export default ResourceAddPage;
